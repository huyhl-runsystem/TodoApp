import axios, { AxiosInstance } from "axios";

const axiosInstance : AxiosInstance = axios.create({
  baseURL: "https://todoapp-uit.vercel.app/",
  timeout: 2000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

