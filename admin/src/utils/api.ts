import axios from "axios";
import { env } from "./env";

export const API = axios.create({
  baseURL: env.SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
