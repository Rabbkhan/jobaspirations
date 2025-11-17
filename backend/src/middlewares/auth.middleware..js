// middlewares/authMiddleware.js
import jwt  from "jsonwebtoken";
import { STATUS } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

export const authenticate = (req, res, next) => {
  try {
    // 👇 Read token from cookie
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ success: false, message: MESSAGES.INVALID_TOKEN });
    }

    // 👇 Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if(!decoded){
        return res.status(STATUS.UNAUTHORIZED).json({
            message: MESSAGES.INVALID_TOKEN,
            success:false
        })
    }
    // 👇 Attach user ID to req object
req.user = { id: decoded.userId };

    next();
  } catch (error) {
    return res.status(STATUS.FORBIDDEN).json({ success: false, message: MESSAGES.TOKEN_EXPIRED });
  }
};
