import mongoose from "mongoose";
import Perkara from "../models/perkaraModel.js";

let riwayat_daftar = {
    tgl: "",
    tahapan: "Pendaftaran",
    desc: "",
    attachment: []
}

const perkaraCtrl = {
    getAll: async (req, res) => {
        try {
            const page = req.query.page || 1;
            const limit = req.query.limit || 10;
            const skip = (page - 1) * limit;
            const klasifikasi = req.query.klasifikasi;
            let filter = { isDeleted: false }

            if (klasifikasi) {
                filter.klasifikasi = klasifikasi
            }

            const perkara = await Perkara.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const total = perkara.length;

            res.send({
                perkara,
                currentPage: page,
                total,
                totalPages: Math.ceil(total / limit)
            });
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    createOne: async (req, res) => {
        try {
            const riwayat = []

            const { klasifikasi, jenis, nomor, kodePerkara, tahun, kodeSatker, tglDaftar } = req.body;

            daftar = {
                tgl: tglDaftar,
                tahapan: "Pendaftaran",
                desc: "",
                attachment: []
            }

            riwayat.push(daftar)
            console.log("riwayat ", riwayat)

            const perkara = new Perkara({
                klasifikasi, jenis, nomor, kodePerkara, tahun, kodeSatker, tglDaftar, riwayat
            });

            await perkara.save();
            res.status(201).json(perkara)
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    getOne: async (req, res) => {
        try {
            const validObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
            if (validObjectId) {
                const perkara = await Perkara.findOne({ _id: req.params.id });
                if (!perkara) return res.status(404).json({ msg: "perkara is not exist." })

                res.json(perkara)
            } else {
                res.status(400).json({ message: "ObjectId is not valid" })
            }
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    updateOne: async (req, res) => {
        try {
            const { klasifikasi, jenis, nomor, kodePerkara, tahun, kodeSatker, tglDaftar } = req.body;

            const item = await Perkara.findOne({ _id: req.params.id });

            if (!item) return res.status(404).json({ msg: "Tidak ada perkara ditemukan" });

            daftar = {
                tgl: tglDaftar,
                tahapan: "Pendaftaran",
                desc: "",
                attachment: []
            }

            if (item.riwayat) {
                item.riwayat[0] = daftar;
            } else {
                item.riwayat.push(daftar);
            }

            const perkara = await Perkara.findOneAndUpdate({ _id: req.params.id }, {
                klasifikasi, jenis, nomor, kodePerkara, tahun, kodeSatker, tglDaftar, riwayat: item.riwayat
            }, { new: true });

            res.status(200).json(perkara);
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    riwayatOne: async (req, res) => {
        try {
            const { riwayat, tglPutusan, tglMinutasi, tglBht } = req.body;

            const perkara = await Perkara.findOneAndUpdate({ _id: req.params.id }, {
                riwayat, tglPutusan, tglMinutasi, tglBht
            }, { new: true })

            res.status(200).json(perkara)
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    deleteOne: async (req, res) => {
        try {
            const { isDeleted } = req.body;

            const perkara = await Perkara.findOneAndUpdate({ _id: req.params.id }, {
                isDeleted
            }, { new: true })

            res.status(200).json(perkara)
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    }
}

export default perkaraCtrl;