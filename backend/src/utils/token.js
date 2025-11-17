import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const payload = { userId: user._id };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });

  return token;
};
