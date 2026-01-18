import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
});

export const singleUpload = (req, res, next) => {
    upload.single("file")(req, res, (err) => {
        if (err) {
            console.log("Multer error:", err);
            return res.status(400).json({
                message: "File upload error",
                error: err.message,
                success: false
            });
        }
        next();
    });
}; 