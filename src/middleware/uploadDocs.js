import multer from "multer";

// configure storare
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'src/uploads/docs/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// file filter 
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["application/pdf", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "text/plain", "application/rtf", "application/vnd.oasis.opendocument.text"]
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Only document formats (.pdf, .docx, .doc, .txt, .rtf, etc. )are allowed'), false)
    }
};

const uploadDocuments = multer ({ storage, fileFilter});

export default uploadDocuments