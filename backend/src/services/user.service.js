import { User } from "../models/user.model.js";

export const updateProfile = async ({ userId, fullname, email, phoneNumber, bio, skills }) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found");

    const updates = {
      ...(fullname && { fullname }),
      ...(email && { email }),
      ...(phoneNumber && { phoneNumber }),
      ...(bio && { bio }),
      ...(skills && { skills: skills.split(",") }),
    };

    Object.assign(user, updates); // merge updates into user object
    const updatedUser = await user.save();

    return updatedUser;
  } catch (error) {
    throw new Error("Error updating profile: " + error.message);
  }
};
