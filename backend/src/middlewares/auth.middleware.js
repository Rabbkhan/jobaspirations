// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";
import { STATUS } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

const JWT_ISSUER = process.env.JWT_ISSUER || "jobaspirations-api";
const JWT_AUDIENCE = process.env.JWT_AUDIENCE || "jobaspirations-client";

export const authenticate = (req, res, next) => {
  try {
    let token = req.cookies?.token;

    // Allow Bearer token
    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // ✅ USER NOT LOGGED IN
    if (!token) {
      return res.status(STATUS.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.AUTH_REQUIRED,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY, {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    });

    // ✅ SAFETY CHECK
    if (!decoded?.userId || !decoded?.role) {
      return res.status(STATUS.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.AUTH_INVALID,
      });
    }

    // ✅ ATTACH USER
    req.user = {
      _id: decoded.userId, // Mongo convention
      role: decoded.role,
    };

    next();
  } catch (error) {
    // ✅ TOKEN EXPIRED
    if (error.name === "TokenExpiredError") {
      return res.status(STATUS.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.SESSION_EXPIRED,
      });
    }

    // ✅ TOKEN TAMPERED / INVALID
    return res.status(STATUS.UNAUTHORIZED).json({
      success: false,
      message: MESSAGES.AUTH_INVALID,
    });
  }
};
