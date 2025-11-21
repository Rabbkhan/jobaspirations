import { User } from "../models/user.model.js";
import { uploadToCloud } from "../utils/uploadToCloud.js";

export const updateProfile = async ({
  userId, fullname, email, phoneNumber, bio, skills,
  resumeFile, profilePhotoFile
}) => {

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

// if (resumeFile) {
//   const url = await uploadToCloud(resumeFile);
//   console.log("Uploaded PDF URL:", url); // <--- ADD THIS
//   user.profile.resume = url;
// }



  if (resumeFile) {
    const url = await uploadToCloud(resumeFile, "raw");
    user.profile.resume = url;
    user.profile.resumeOriginalName = resumeFile.originalname;
  }

  if (profilePhotoFile) {
    const url = await uploadToCloud(profilePhotoFile, "image");
    user.profile.profilePhoto = url;
  }

  if (fullname) user.fullname = fullname;
  if (email) user.email = email;
  if (phoneNumber) user.phoneNumber = phoneNumber;
  if (bio) user.profile.bio = bio;
  if (skills) user.profile.skills = skills;  // should be string!

  return await user.save();
};
