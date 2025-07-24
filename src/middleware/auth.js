import jwt from "jsonwebtoken";
import User from "../models/userModel.js"

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if (!token) return res.status(401).json({message: "No Token. Access denied!"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");
        
        if (!user) return res.status(401).json({message: "Invalid authentication."});

        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export default auth;