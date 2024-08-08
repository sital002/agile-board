import { env } from "@/lib/config";
import axios from "axios";

export const API = axios.create({
  baseURL: env.VITE_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    "x-access-server": `${localStorage.getItem("access_token")}`,
  },
});
