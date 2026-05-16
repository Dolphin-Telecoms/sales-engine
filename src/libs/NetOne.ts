import axios from "axios";

const NetOneAxios = axios.create({
  baseURL: process.env.NETONE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "x-access-code": process.env.NETONE_ACCESS_CODE,
    "x-access-password": process.env.NETONE_ACCESS_PASSWORD,
  },
});

// Generate fresh value before every request
NetOneAxios.interceptors.request.use((config) => {
  config.headers["x-agent-reference"] = `DTEL${new Date().toISOString()}`;

  return config;
});

export default NetOneAxios;
