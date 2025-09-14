import Eksekusi from "../models/eksekusiModel.js"

const eksekusiCtrl = {
    get: async (req, res) => {
        try {
            const page = req.query.page || 1;
            const limit = req.query.limit || 10;
            const sort = req.query.sort || '-tglRegister -createdAt';
            const skip = (page - 1) * limit;

            const allEksekusi = await Eksekusi.find({ isDeleted: false })

            const eksekusi = await Eksekusi.find({ isDeleted: false })
                .populate('perkara')
                .sort({ tglRegister: -1 })
                .skip(skip)
                .limit(limit);

            res.json({
                eksekusi,
                currentPage: page,
                total,
                totalPages: Math.ceil(total / limit)
            })
        } catch (error) {
            res.status(500).json({ msg: "Ada kesalahan", desc: error.message });
        }
    },
    createOne: async (req, res) => {
        try {
            const { nomorRegister, tglRegister } = req.body;

            const eksekusi = new Eksekusi({
                nomorRegister, tglRegister
            })

            await eksekusi.save();
            res.status(201).json(eksekusi);
        } catch (error) {
            res.status(500).json({ msg: "Ada kesalahan", desc: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const eksekusi = await Eksekusi.findOne({ _id: req.params.id })
            if (!eksekusi) return res.status(404).json({ msg: "Permohonan eksekusi tidak ditemukan." });

            res.json(eksekusi);
        } catch (error) {
            res.status(500).json({ msg: "Ada kesalahan", desc: error.message });
        }
    },
    updateOne: async (req, res) => {
        try {
            const {
                name, alamat, email, telp, rekening,
                perkara, pemohon, termohon, jenis,
                attachment, desc, isActive
            } = req.body;

            const item = await Eksekusi.findOne({ _id: req.params.id });

            if (!item) return res.status(404).json({ msg: "Permohonan eksekusi tidak ditemukan" });

            const eksekusi = await Eksekusi.findOneAndUpdate({ _id: req.params.id }, {
                name, alamat, email, telp, rekening,
                perkara, pemohon, termohon, jenis,
                attachment, desc, isActive
            }, { new: true });

            res.status(200).json(eksekusi);
        } catch (error) {
            res.status(500).json({ msg: "Ada kesalahan", desc: error.message });
        }
    },
    deleteOne: async (req, res) => {
        try {
            const { isDeleted } = req.body;

            const eksekusi = await Eksekusi.findOneAndUpdate({ _id: req.params.id }, {
                isDeleted
            }, { new: true })

            res.status(200).json({ msg: "Pemohonan eksekusi telah dihapus" })
        } catch (error) {
            res.status(500).json({ msg: "Ada kesalahan", desc: error.message })
        }
    },
    searchOne: async (req, res) => {
        try {
            const { nomorRegister, tglRegister } = req.body;

            const eksekusi = await Eksekusi.find({ nomorRegister, tglRegister });
            if (!eksekusi) return res.status(404).json({ msg: "Permohonan eksekusi tidak ditemukan." });
            res.json(eksekusi);
        } catch (error) {
            res.status(500).json({ msg: "Ada kesalahan", desc: error.message })
        }
    }
}

export default eksekusiCtrl;