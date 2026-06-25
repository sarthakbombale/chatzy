import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.js";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";
import { getBotResponse } from "./geminiService.js"; // Import chatbot service

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [ENV.CLIENT_URL, "https://chatzy-60qx.onrender.com"],
    credentials: true,
  },
});

// apply authentication middleware to all socket connections
io.use(socketAuthMiddleware);

// we will use this function to check if the user is online or not
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// this is for storing online users
const userSocketMap = {}; // {userId:socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.user.fullName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  // Sync online users list
  io.emit("getOnlineUsers", Object.keys(userSocketMap));


  // 🤖 LISTEN FOR INCOMING MESSAGES
  socket.on("sendMessage", async (messageData) => {
    const { receiverId, text, roomId } = messageData;

    // Check if the recipient is the AI chatbot
    if (receiverId === "ai-bot") {
      // 1. Instantly echo back user message to themselves just in case 
      // (Optional: can be skipped if HTTP already handled it nicely)
      // socket.emit("newMessage", messageData);

      // 2. Generate AI reply
      const botReplyText = await getBotResponse(text);

      const botPayload = {
        _id: `msg-bot-${Date.now()}`,
        roomId: roomId || `room-bot-${userId}`,
        senderId: "ai-bot",        // Ensure it uses senderId to match your schema!
        receiverId: userId,
        text: botReplyText,
        createdAt: new Date().toISOString(),
      };

      // 3. ✅ FIXED: Changed event name from "messageReceived" to "newMessage"
      socket.emit("newMessage", botPayload);
    } else {
      // Normal user-to-user routing logic
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", messageData);
      }
    }
  });

  // Handle Disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };