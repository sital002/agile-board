import { env } from "./env";

export function logger(message: string) {
  if (env.NODE_ENV === "development") {
    console.log(message);
  }
}
