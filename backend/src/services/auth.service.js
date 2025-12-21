import { MESSAGES } from "../constants/messages.js";
import { STATUS } from "../constants/statusCodes.js";
import { User } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import { generateToken } from "../utils/token.js";
import { uploadToCloud } from "../utils/uploadToCloud.js";

export const registerUser = async ({ 
  fullname, email, phoneNumber, password, role, profilePhoto 
}) => {

  fullname = fullname?.trim();
  email = email?.toLowerCase().trim();
  phoneNumber = phoneNumber?.trim();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const err = new Error("User already exists");
    err.status = 400;
    throw err;
  }

  const hashed = await hashPassword(password);

  const allowedRoles = ["student", "recruiter"];
  const userRole = allowedRoles.includes(role) ? role : "student";

  let profilePhotoURL = "";

  if (profilePhoto) {
    profilePhotoURL = await uploadToCloud(profilePhoto, "image");
  }

  const newUser = await User.create({
    fullname,
    email,
    phoneNumber,
    password: hashed,
    role: userRole,
    profile: {
      profilePhoto: profilePhotoURL,
      bio: "",
      skills: [],
      resume: "",
    },
  });

  return {
    success: true,
    message: "User registered successfully",
    userId: newUser._id,
  };
};




export const loginUser = async ({ email, password,role }) => {

 
        let user = await User.findOne({ email });
  if (!user) {
    const err = new Error("User not found");
    err.status = STATUS.NOT_FOUND;
    throw err;
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    const err = new Error(MESSAGES.INVALID_CREDENTIALS);
    err.status = 401;
    throw err;
  }


  //checl role is correct or not
// if (role !== user.role) {
//   const err = new Error(MESSAGES.ROLE_MISMATCH);
//   err.status = STATUS.BAD_REQUEST;
//   throw err;
// }




//   if(role !== user.role){
//     const err = STATUS.BAD_REQUEST;
//     return err.status().json({
//     message: MESSAGES.ROLE_MISMATCH,
//       success:false
//     })
//   };

  
    const token = generateToken(user);
  return { user, token };

//set token in cookies 



    
  }

