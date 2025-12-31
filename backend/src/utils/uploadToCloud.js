import cloudinary from "../config/cloudinary.js";

export const uploadToCloud = (file, type = "raw") => {
  const folderUpload =
    process.env.NODE_ENV === "production"
      ? "job-portal/production"
      : "job-portal/development";

  return new Promise((resolve, reject) => {



    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: type,   // handles pdf, jpg, png
        folder:folderUpload,
        use_filename: true,
        unique_filename: true,
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result.secure_url);
      }
    );

    uploadStream.end(file.buffer);
  });
};


