import mongoose from "mongoose";
import Panggilan from "../models/panggilanModel.js";

class APIfeatures {
     constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }

    sorting(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(',').join(' ')
            this.query = this.query.sort(sortBy)
        }else{
            this.query = this.query.sort('-tgKirim')
        }

        return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 25
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}

const panggilanCtrl = {
    getAll: async (req, res) => {
        try {
            const page = req.query.page || 1;
            const limit = req.query.limit || 10;
            const skip = (page - 1) * limit;

            const features = new APIfeatures(Panggilan.find({ isDeleted: false }).populate('jenisPanggilan jurusita'), req.query)
            .filtering().sorting().paginating()

            const panggilan = await features.query

            // const panggilan = await Panggilan.find({ isDeleted: false })
            //     .populate('jenisPanggilan jurusita')
            //     .sort({ tglKirim: -1 })
            //     .skip(skip)
            //     .limit(limit);

            const total = panggilan.length;

            res.send({
                panggilan,
                currentPage: page,
                total,
                totalPages: Math.ceil(total / limit)
            });
        } catch (error) {
            res.status(500).json({ msg: "Ada kesalahan", desc: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const { jenisPanggilan, tglKirim, jurusita, nomorPerkara, pihak, alamat, tglSidang, dueDate } = req.body
            const panggilan = new Panggilan({
                jenisPanggilan, tglKirim, jurusita, nomorPerkara, pihak, alamat, tglSidang, dueDate
            });

            await panggilan.save();

            res.status(201).json(panggilan);
        } catch (error) {
            return res.status(500).json({ msg: "Ada kesalahan", desc: error.message });
        }
    },
    get: async (req, res) => {
        try {
            const validObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
            if (validObjectId) {
                const panggilan = await Panggilan.findOne({ _id: req.params.id }).populate('jurusita jenisPanggilan');
                if (!panggilan) return res.status(404).json({ msg: "Panggilan yang anda cari tidak ditemukan." });

                res.status(200).json(panggilan);
            } else {
                res.status(400).json({ message: "Pastikan panggilan anda valid." });
            }
        } catch (error) {
            return res.status(500).json({ msg: "Ada kesalahan", desc: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const { 
                jenisPanggilan, tglKirim, jurusita, nomorPerkara, pihak, alamat, tglSidang, dueDate,
                nomorKirim, tglPelaksanaan, hasilPanggilan, desc, fileResi, fileTracking
             } = req.body;

            const panggilan = await Panggilan.findOneAndUpdate({ _id: req.params.id }, {
                jenisPanggilan, tglKirim, jurusita, nomorPerkara, pihak, alamat, tglSidang, dueDate,
                nomorKirim, tglPelaksanaan, hasilPanggilan, desc, fileResi, fileTracking
            }, { new: true });

            res.status(200).json(panggilan);
        } catch (error) {
            return res.status(500).json({ msg: "Ada kesalahan", desc: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { isDeleted } = req.body;

            await Panggilan.findOneAndUpdate({ _id: req.params.id }, {
                isDeleted
            });

            res.status(200).json({ msg: "Panggilan telah berhasil dihapus." });
        } catch (error) {
            return res.status(500).json({ msg: "Ada kesalahan", desc: error.message });
        }
    },
    cancelPengiriman: async (req, res) => {
        try {

            await Panggilan.findOneAndUpdate({ _id: req.params.id }, {
                $unset: {nomorKirim:1, fileResi:1}
            });

            res.status(200).json({ msg: "Berhasil membatalkan Pengiriman" });
        } catch (error) {
            return res.status(500).json({ msg: "Ada kesalahan", desc: error.message });
        }
    },
    cancelPelaksanaan: async (req, res) => {
        try {
            await Panggilan.findOneAndUpdate({ _id: req.params.id }, {
                $unset: {tglPelaksanaan:1, hasilPanggilan:1, desc:1, fileTracking:1}
            });

            res.status(200).json({ msg: "Berhasil membatalkan Pelaksanaan" });
        } catch (error) {
            return res.status(500).json({ msg: "Ada kesalahan", desc: error.message });
        }
    },
}

export default panggilanCtrl;