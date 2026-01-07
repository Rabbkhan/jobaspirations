// src/config/env.js

const isProduction =
  process.env.NODE_ENV === "production" ||
  process.env.FORCE_PROD === "true";

let FRONTEND_URL = null;
let FRONTEND_ALLOWED_ORIGINS = [];

if (isProduction) {
  FRONTEND_URL = process.env.FRONTEND_URL_LIVE || null;

  FRONTEND_ALLOWED_ORIGINS = [
    process.env.FRONTEND_URL_LIVE,
    process.env.FRONTEND_URL_LIVE_WWW,
  ].filter(Boolean); // remove undefined values
} else {
  FRONTEND_URL = process.env.FRONTEND_URL_LOCAL || null;

  FRONTEND_ALLOWED_ORIGINS = [
    process.env.FRONTEND_URL_LOCAL,
  ].filter(Boolean);
}

export {
  isProduction,
  FRONTEND_URL,
  FRONTEND_ALLOWED_ORIGINS,
};
