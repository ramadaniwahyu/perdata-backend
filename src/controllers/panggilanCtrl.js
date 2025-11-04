import mongoose from "mongoose";
import Panggilan from "../models/panggilanModel.js";

const panggilanCtrl = {
    getAll: async (req, res) => {
        try {
            const page = req.query.page || 1;
            const limit = req.query.limit || 25;
            const skip = (page - 1) * limit;
            const sort = req.query.sort || '-tglKirim'
            const tglKirim = req.query.tglKirim;
            let filter = { isDeleted: false }

            if (tglKirim) {
                filter.tglKirim = tglKirim
            }

            const allPanggilan = await Panggilan.find(filter);

            const panggilan = await Panggilan.find(filter)
                .populate('jenisPanggilan jurusita')
                .sort(sort)
                .skip(skip)
                .limit(limit);

            const total = allPanggilan.length;

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