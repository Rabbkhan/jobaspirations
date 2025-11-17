import { MESSAGES } from "../constants/messages.js";
import { STATUS } from "../constants/statusCodes.js";
import { User } from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import { generateToken } from "../utils/token.js";

export const registerUser = async ({ fullname, email, phoneNumber, password, role }) => {


// 1️⃣ Basic sanitization
  fullname = fullname?.trim();
  email = email?.toLowerCase().trim();
  phoneNumber = phoneNumber?.trim();




  // 1. Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
  const err = new Error(MESSAGES.USER_EXISTS);
    err.status = 400;
    throw err;
  }

  
  // 2. Hash password
  const hashed = await hashPassword(password);

  // 3. Secure role handling
  
  const allowedRoles = ["student", "recruiter"];
  const userRole = allowedRoles.includes(role) ? role : "student";

  // 4. Create user
  const newUser = await User.create({
    fullname,
    email,
    phoneNumber,
    password: hashed,
    role:userRole,
  });

  // 5. Return result (controller will send response)
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
    const err = new Error("Invalid credentials");
    err.status = 401;
    throw err;
  }


  //checl role is correct or not
if (role !== user.role) {
  const err = new Error(MESSAGES.ROLE_MISMATCH);
  err.status = STATUS.BAD_REQUEST;
  throw err;
}




  // if(role !== user.role){
  //   const err = STATUS.BAD_REQUEST;
  //   return err.status().json({
  //     message:,
  //     success:false
  //   })
  // };

  
    const token = generateToken(user);
  return { user, token };

//set token in cookies 



    
  }

