import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const payload = {
    userId: user._id,
    role: user.role,   // ✅ THIS FIXES EVERYTHING
  };

  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
};
