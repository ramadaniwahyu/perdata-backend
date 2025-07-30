import jwt from "jsonwebtoken";
import User from "../models/userModel.js"

export const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")
        if (!token) return res.status(401).json({msg: "No Token. Access denied!"});
        
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        
        const user = await User.findById(decoded.user).select("-password");

        if (!user) return res.status(401).json({msg: "Invalid authentication."});

        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
}

export const authAdmin = async (req, res, next) =>{
    try {
        // Get user information by id
        const user = await User.findOne({
            _id: req.user.id
        })
        if(user.role !== 0)
            return res.status(400).json({msg: "Admin resources access denied"})

        next()
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}