export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_API_URL
    : process.env.REACT_APP_API_DEV_URL;
