// middlewares/error.middleware.js
export const globalErrorHandler = (err, req, res) => {
  const statusCode = err.statusCode || err.status || 500;
  const isProd = process.env.NODE_ENV === "production";
  const safeMessage =
    statusCode >= 500 && isProd ? "Internal Server Error" : err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message: safeMessage,
    ...(isProd ? {} : { stack: err.stack }),
  });
};
