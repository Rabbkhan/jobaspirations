export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {

    console.log("REQ.USER:", req.user);
    console.log("ROLE:", req.user?.role);
    console.log("ALLOWED ROLES:", allowedRoles);

    const userRole = req.user?.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You are not authorized for this action.",
      });
    }

    next();
  };
};
