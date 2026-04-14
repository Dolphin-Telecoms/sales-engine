import axios from "axios";

const CoverageAxios = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_COVERAGE_URL}`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  auth: {
    username: `${process.env.NEXT_PUBLIC_COVERAGE_USERNAME}`,
    password: `${process.env.NEXT_PUBLIC_COVERAGE_PASSWORD}`,
  },
});

export default CoverageAxios;
