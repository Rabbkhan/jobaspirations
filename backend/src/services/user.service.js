import { User } from "../models/user.model.js";
import { uploadToCloud } from "../utils/uploadToCloud.js";

export const updateProfile = async ({
  userId,
  fullname,
  email,
  phoneNumber,
  bio,
  skills,
  resumeFile,
  profilePhotoFile,
}) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  if (resumeFile) {
    const uploaded = await uploadToCloud(resumeFile, "raw");
    user.profile.resume = uploaded.url;
    user.profile.resumeOriginalName = resumeFile.originalname;
  }

  if (profilePhotoFile) {
    const uploaded = await uploadToCloud(profilePhotoFile, "image");
    user.profile.profilePhoto = uploaded.url;
  }

  if (fullname) user.fullname = fullname;
  if (email) user.email = email;
  if (phoneNumber) user.phoneNumber = phoneNumber;
  if (bio) user.profile.bio = bio;

  if (skills) {
    user.profile.skills = skills.split(",").map(s => s.trim());
  }

  return await user.save();
};
