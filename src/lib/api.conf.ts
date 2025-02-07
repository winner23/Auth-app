export const SERVER_URL = process.env.SERVER_URL as string;

export const API_URL = {
  root: (url = "") => `/api/v1${url ? url : ""}`,
  auth: (url = "") => API_URL.root(`/auth${url}`),
};
