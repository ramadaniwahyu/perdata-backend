import express from "express";
import uploadDocuments from "../middleware/uploadDocs.js";
import { auth } from "../middleware/auth.js"

const router = express.Router();

router.post("/upload-docs", auth, uploadDocuments.array("myFiles", 20), (req, res) => {
    if (!req.files) {
        return res.status(400).json({ msg: "No documents uploaded." });
    } 
    const uploadedFileUrls = req.files.map((file) => 
        `${req.protocol}://${req.get("host")}/uploads/docs/${file.filename}`
    )
    // const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ uploadedFileUrls })
})

router.post('/upload-file', auth, uploadDocuments.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: "No file uploaded." });
    } 
    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/docs/${req.file.filename}`;
    res.status(200).json({ fileUrl })
})


export default router;