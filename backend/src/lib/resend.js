import { Resend } from "resend";
import { ENV } from "./env.js";

export const resendClient = new Resend(ENV.RESEND_API_KEY);

// Sender details loaded from environment variables
export const sender = {
  email: ENV.SENDER_EMAIL || "onboarding@resend.dev", // fallback for dev
  name: ENV.SENDER_NAME || "Chatzy",
};
