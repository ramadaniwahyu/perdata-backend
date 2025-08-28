import mongoose from "mongoose";
import Panggilan from "../models/panggilanModel.js";

const panggilanCtrl = {
    getAll: async (req, res) => {
        try {
            const page = req.query.page || 1;
            const limit = req.query.limit || 10;
            const skip = (page - 1) * limit;

            const panggilan = await Panggilan.find({ isDeleted: false })
                .populate('jenisPanggilan jurusita')
                .sort({ tglKirim: -1 })
                .skip(skip)
                .limit(limit);

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
                const panggilan = await Js.findOne({ _id: req.params.id });
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
            const { jenisPanggilan, tglKirim, jurusita, nomorPerkara, pihak, alamat, tglSidang, dueDate } = req.body;

            const panggilan = await Panggilan.findOneAndUpdate({ _id: req.params.id }, {
                jenisPanggilan, tglKirim, jurusita, nomorPerkara, pihak, alamat, tglSidang, dueDate
            }, { new: true });

            res.status(200).json(panggilan);
        } catch (error) {
            return res.status(500).json({ msg: "Ada kesalahan", desc: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            const { isDeleted } = req.body;

            const panggilan = await Panggilan.findOneAndUpdate({ _id: req.params.id }, {
                isDeleted
            }, { new: true });

            res.status(200).json({ msg: "Panggilan telah berhasil dihapus." });
        } catch (error) {
            return res.status(500).json({ msg: "Ada kesalahan", desc: error.message });
        }
    },

}

export default panggilanCtrl;