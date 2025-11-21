import cloudinary from "../config/cloudinary.js";

export const uploadToCloud = (file, type = "raw") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: type,                         // raw → PDF, docx | image → photos
        folder: "job-portal",
        public_id: file.originalname,
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }
    );

    uploadStream.end(file.buffer); // <-- CRITICAL
  });
};
