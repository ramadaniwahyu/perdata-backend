import mongoose from "mongoose";
import Js from "../models/jurusitaModel.js";

export const jurusitaCtrl = {
    getAll: async (req, res) => {
        try {
            const page = req.query.page || 1;
            const limit = req.query.limit || 10;
            const skip = (page - 1) * limit;

            const jurusita = await Js.find({ isDeleted: false }).select('-isDeleted')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const total = jurusita.length;

            res.send({
                jurusita,
                currentPage: page,
                total,
                totalPages: Math.ceil(total / limit)
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    create: async (req, res) => {
        try {
            const { name, nip, desc } = req.body;

            const jurusita = new Js({
                name, nip, desc
            });

            await jurusita.save();
            res.status(201).json(jurusita)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getOne: async (req, res) => {
        try {
            const validObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
            if (validObjectId) {
                const jurusita = await Js.findOne({ _id: req.params.id });
                if (!jurusita) return res.status(404).json({ msg: "Jurusita is not exist." })

                res.json(jurusita)
            } else {
                res.status(400).json({ message: "ObjectId is not valid" })
            }
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    updateOne: async (req, res) => {
        const { name, nip, desc, isActive } = req.body;

        const jurusita = await Js.findOneAndUpdate({ _id: req.params.id }, {
            name, nip, desc, isActive
        }, { new: true })

        res.status(200).json(jurusita)
    },
    activateOne: async (req, res) => {
        try {
            const { isActive } = req.body;

            if (isActive == null) res.status(400).json({ message: "There is no required field." });

            await User.findOneAndUpdate({ _id: req.params.id }, {
                isActive
            }, { new: true })

            if (isActive) { res.status(200).json({ msg: "Jurusita is activated" }) }
            else { res.status(200).json({ msg: "Jurusita is deactivated" }) }
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    deleteOne: async (req, res) => {
        try {
            const { isDeleted } = req.body;

            if (isDeleted == null) res.status(400).json({ message: "There is no required field." });

            await Js.findOneAndUpdate({ _id: req.params.id }, {
                isDeleted
            }, { new: true })

            res.status(200).json({ message: "Jurusita is deleted." })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
};