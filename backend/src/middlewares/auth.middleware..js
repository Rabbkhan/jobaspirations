// middlewares/authMiddleware.js
import jwt  from "jsonwebtoken";
import { STATUS } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

export const authenticate = (req, res, next) => {
  try {
    let token = req.cookies?.token;

    // Also allow Authorization Bearer token
    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: MESSAGES.INVALID_TOKEN
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = { id: decoded.userId,
      role: decoded.role,   // ✅ REQUIRED
     };
    next();
  } catch (error) {
    return res.status(STATUS.FORBIDDEN).json({
      success: false,
      message: MESSAGES.TOKEN_EXPIRED
    });
  }
};
