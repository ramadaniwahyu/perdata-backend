import multer from "multer";

// configure storare
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'src/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// file filter 
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Only .jpeg .jpg and .png formats are allowed'), false)
    }
};

const upload = multer ({ storage, fileFilter});

export default upload