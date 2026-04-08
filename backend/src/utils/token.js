import jwt from "jsonwebtoken";

const JWT_ISSUER = process.env.JWT_ISSUER || "jobaspirations-api";
const JWT_AUDIENCE = process.env.JWT_AUDIENCE || "jobaspirations-client";

export const generateToken = (user) => {
  const payload = {
    userId: user._id.toString(),
    role: user.role,
  };

  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1d",
    issuer: JWT_ISSUER,
    audience: JWT_AUDIENCE,
    subject: user._id.toString(),
  });
};
