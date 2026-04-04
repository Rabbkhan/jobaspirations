import { User } from "./user.model.js";
import { uploadToCloud } from "../../utils/uploadToCloud.js";

// ------------------- GET PROFILE -------------------
export const getProfileService = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw new Error("User not found");
  return user;
};

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
  const user = await User.findById(userId).select("-password");
  if (!user) throw new Error("User not found");

  if (!user.profile) {
    user.profile = {};
  }

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
    let parsedSkills = [];

    if (Array.isArray(skills)) {
      parsedSkills = skills;
    } else {
      try {
        parsedSkills = JSON.parse(skills);
      } catch {
        parsedSkills = skills.split(",").map((s) => s.trim());
      }
    }

    user.profile.skills = parsedSkills;
  }

  return await user.save();
};
