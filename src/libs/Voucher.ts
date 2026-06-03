// lib/serverToken.ts
import { cookies } from "next/headers";
import axios, { InternalAxiosRequestConfig } from "axios";

// 👉 Decode JWT expiry (Node-safe)
const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString(),
    );
    return Date.now() > payload.exp * 1000;
  } catch {
    return true;
  }
};

export const getServerAccessToken = async (): Promise<string | null> => {
  const cookieStore = cookies();
  let token = (await cookieStore).get("token")?.value;

  // ✅ If token exists and valid → use it
  if (token && !isTokenExpired(token)) {
    return token;
  }

  // ❗ Otherwise fetch new token
  const res = await axios
    .get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/apis/token`)
    .then((req) => req.data);
    
  return res.token;
};

const VoucherAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VOUCHER_BASE_URL,
});

VoucherAxios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getServerAccessToken();
    
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default VoucherAxios;
