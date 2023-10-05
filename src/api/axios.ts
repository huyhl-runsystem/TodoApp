import axios, { AxiosInstance } from "axios";

const axiosInstance : AxiosInstance = axios.create({
  baseURL: "https://todoapp-uit.vercel.app/api",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

