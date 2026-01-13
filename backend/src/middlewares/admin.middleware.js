import jwt from "jsonwebtoken";
import { STATUS } from "../constants/statusCodes.js";

export const adminAuthenticate = (req, res, next) => {
  try {
    const token = req.cookies?.admin_token;

    if (!token) {
      return res.status(STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded || decoded.role !== "admin") {
      return res.status(STATUS.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // ✅ ATTACH ADMIN (CONSISTENT)
    req.user = {
      id: decoded.id,
      role: decoded.role,
      fullname: decoded.fullname,
    };

    next();
  } catch (err) {
    return res.status(STATUS.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
