import jwt from "jsonwebtoken";
import User from "../models/userModel.js"

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if (!token) return res.status(401).json({msg: "No Token. Access denied!"});

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decoded)
        const user = await User.findById(decoded.user).select("-password");

        if (!user) return res.status(401).json({msg: "Invalid authentication."});

        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export default auth;