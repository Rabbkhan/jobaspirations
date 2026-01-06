const isProduction =
  process.env.NODE_ENV === "production" ||
  process.env.FORCE_PROD === "true";

let FRONTEND_URL;
let FRONTEND_ALLOWED_ORIGINS = [];

if (isProduction) {
  FRONTEND_URL = process.env.FRONTEND_URL_LIVE;

  FRONTEND_ALLOWED_ORIGINS = [
    process.env.FRONTEND_URL_LIVE,
    process.env.FRONTEND_URL_LIVE_WWW,
  ];
} else {
  FRONTEND_URL = process.env.FRONTEND_URL_LOCAL;

  FRONTEND_ALLOWED_ORIGINS = [process.env.FRONTEND_URL_LOCAL];
}

if (!FRONTEND_URL) {
  throw new Error("Primary FRONTEND_URL is not defined");
}

export { FRONTEND_URL, FRONTEND_ALLOWED_ORIGINS };
