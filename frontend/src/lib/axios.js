import axios from "axios";

const isDev = window.location.hostname === "localhost";

export const axiosInstance = axios.create({
  baseURL: isDev ? "http://localhost:3000/api" : "/api",
  withCredentials: true,
});