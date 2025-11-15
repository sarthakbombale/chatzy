import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, ENV.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
    httpOnly: true, // prevents JS from reading the cookie
    sameSite: "strict", // prevents CSRF
    secure: ENV.NODE_ENV !== "development", // true only in production (HTTPS)
  });

  return token;
};
