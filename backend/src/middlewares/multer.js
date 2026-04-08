import multer from "multer";

const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
  "application/pdf",
]);

export const upload = multer({
  storage: multer.memoryStorage(), // <--- NO LOCAL FILES
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      return cb(new Error("Invalid file type. Only images and PDF are allowed"));
    }
    cb(null, true);
  },
});
