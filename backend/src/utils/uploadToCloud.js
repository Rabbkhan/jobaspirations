import cloudinary from "../config/cloudinary.js";

export const uploadToCloud = (file, type = "image") => {
  const folderUpload =
    process.env.NODE_ENV === "production" ? "job-portal/production" : "job-portal/development";

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: type,
        folder: folderUpload,
        use_filename: true,
        unique_filename: true,
      },
      (err, result) => {
        if (err) return reject(err);

        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    );

    uploadStream.end(file.buffer);
  });
};

export const deleteFromCloud = async (public_id) => {
  return await cloudinary.uploader.destroy(public_id);
};
