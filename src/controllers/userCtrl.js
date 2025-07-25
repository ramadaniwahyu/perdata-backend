import mongoose from "mongoose";
import User from "../models/userModel.js";

const userCtrl = {
    getUsers: async (req, res) => {
        try {
            const page = req.query.page || 1;
            const limit = req.query.limit || 5;
            const skip = (page - 1) * limit;

            const users = await User.find({ isDeleted: false }).select('-password')
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);

            const totalUsers = users.length;

            res.send({
                users,
                currentPage: page,
                totalUsers,
                totalPages: Math.ceil(totalUsers / limit)
            });
        } catch (error) {
            res.status(500).json({ msg: error.message })
        }
    },
    getOneUser: async (req, res) => {
        try {
            const validObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
            if (validObjectId) {
                const user = await User.findOne({ _id: req.params.id }).select('-password');
                if (!user) return res.status(404).json({ msg: "User is not exist." })

                res.json(user)
            } else {
                res.status(404).json({ msg: "ObjectId is not valid" })
            }
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    updateUser: async (req, res) => {
        try {
            const { username, email, password, role, isActive } = req.body;

            if (password && password.length < 6)
                return res.status(400).json({ msg: "Password's length is minimal 6 characters." })

            const user = await User.findOneAndUpdate({ _id: req.params.id }, {
                username, email, password, role, isActive
            }, { new: true })

            res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    activateUser: async (req, res) => {
        try {
            const { isActive } = req.body;

            if (isActive == null) res.status(400).json({ msg: "There is no required field." });

            await User.findOneAndUpdate({ _id: req.params.id }, {
                isActive
            }, { new: true })

            if (isActive) { res.json({ msg: "User is activated" }) }
            else { res.json({ msg: "User is deactivated" }) }
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { isDeleted } = req.body;

            if (isDeleted == null) res.status(400).json({ message: "There is no required field." });

            await User.findOneAndUpdate({ _id: req.params.id }, {
                isDeleted
            }, { new: true })

            res.status(200).json({ message: "User is deleted." })
        } catch (error) {
            return res.status(500).json({ message: error.message })
        }
    },
    
}

export default userCtrl;