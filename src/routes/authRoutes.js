import express from "express";
import authCtrl from "../controllers/authCtrl.js";
import { auth, authAdmin } from "../middleware/auth.js"
import { generate_token } from "../lib/tools.js"
import upload from "../middleware/upload.js";

const router = express.Router();

router.route('/profile')
    .get(auth, authCtrl.getInfo)
    .patch(auth, authCtrl.updateInfo)
    .put(auth, authCtrl.changePassword)

router.post('/login', authCtrl.login)
router.post('/register', authCtrl.register)
router.get('/logout', auth, authCtrl.logout)
router.get('/refresh_token', authCtrl.refreshToken)
router.post('/upload-image', upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: "No image uploaded." });
    } 
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl })
})

export default router;