import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '11m' })
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

const authCtrl = {
    login: async (req, res) => {
        try {
            res.json({msg: "login success!"})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.json({msg: "logout success!"})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    refreshToken: async (req, res) => {
        try {
            res.json({msg: "refresh token success!"})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    getInfo: async (req, res) => {
        try {
            res.json({msg: "get info success!"})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    },
    updateInfo: async (req, res) => {
        try {
            res.json({msg: "update info success!"})
        } catch (error) {
            res.status(500).json({msg: error.message})
        }
    }
}

export default authCtrl;