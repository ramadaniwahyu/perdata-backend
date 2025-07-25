import Perkara from "../models/perkaraModel.js";

const perkaraCtrl = {
    getAll: async (req, res) => {
        try {
            const page = req.query.page || 1;
            const limit = req.query.limit || 10;
            const skip = (page - 1) * limit;

            const perkara = await Perkara.find({ isDeleted: false })
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
            const { nomor, kodePerkara, tahun, kodeSatker, tglDaftar } = req.body;

            const perkara = new Perkara({
                nomor, kodePerkara, tahun, kodeSatker, tglDaftar
            });

            await perkara.save();
            res.status(201).json(perkara)
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    getOne: async (req, res) => { res.status(500).json({msg: "Something went wrong."}) },
    updateOne: async (req, res) => { res.status(500).json({msg: "Something went wrong."}) },
    deleteOne: async (req, res) => { res.status(500).json({msg: "Something went wrong."}) }
}

export default perkaraCtrl;