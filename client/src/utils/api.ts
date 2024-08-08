import { env } from "@/lib/config";
import axios from "axios";

export const API = axios.create({
  baseURL: env.VITE_SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "x-access-server": `${localStorage.getItem("access_token")}`,
  },
});
