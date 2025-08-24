import mongoose from "mongoose";
import JenisPanggilan from "../models/jenisPanggilanModel.js"

const jenisPanggilanCtrl = {
    get: async (req, res) => {
        try {
            const jenisPanggilan = await JenisPanggilan.find({ isDeleted: false }).sort({ name: 1 });

            let arr = [] 

            jenisPanggilan.map((i) => {
                let obj = {};
                obj.label = i.name;
                obj.value = i._id;

                arr.push(obj)
            })

            res.status(200).json(arr);
        } catch (error) {
            res.status(500).json({ msg: "Ada kesalahan", desc: error.message })
        }
    },
    create: async (req, res) => {
        try {
            const { name, desc } = req.body;

            const jenisPanggilan = new JenisPanggilan({
                name, desc
            })

            await jenisPanggilan.save();
            res.status(201).json(jenisPanggilan);
        } catch (error) {
            res.status(500).json({ msg: "Ada kesalahan", desc: error.message })
        }
    },
    update: async (req, res) => {
        try {
            const { name, desc } = req.body;

            const jenisPanggilan = await JenisPanggilan.findOneAndUpdate({ _id: req.params.id }, {
                name, desc
            }, { new: true });

            res.status(200).json(jenisPanggilan);
        } catch (error) {
            res.status(500).json({ msg: "Ada kesalahan", desc: error.message })
        }
    },
    delete: async (req, res) => {
        try {
            const { isDeleted } = req.body;

            await JenisPanggilan.findOneAndUpdate({_id: req.params.id}, {
                isDeleted
            });

            res.status(200).json({msg: "Jenis Panggilan telah berhasil dihapus"});
        } catch (error) {
            res.status(500).json({msg: "Ada kesalahan", desc: error.message})
        }
    },
}

export default jenisPanggilanCtrl;