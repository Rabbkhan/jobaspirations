// middlewares/role.middleware.js (or wherever you keep it)
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // fail closed: if req.user missing, block
    if (!req.user || !req.user.role) {
      return res.status(403).json({
        success: false,
        message: "Access denied. No role found.",
      });
    }

    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You are not authorized for this action.",
      });
    }
    next();
  };
};
