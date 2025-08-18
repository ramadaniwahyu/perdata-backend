import express from "express";
import uploadDocuments from "../middleware/uploadDocs";

const router = express.Router();

router.post("/upload-docs", upload.array("myFiles", 10), (req, res) => {
    if (!req.files) {
        return res.status(400).json({ msg: "No documents uploaded." });
    } 
    const uploadedFileUrls = req.files.map((file) => 
        `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    )
    // const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(200).json({ uploadedFileUrls })
})