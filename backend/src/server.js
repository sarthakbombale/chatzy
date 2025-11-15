import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// -------------------------
// 🚀 PRODUCTION BUILD SETUP
// -------------------------
if (process.env.NODE_ENV === "production") {
    const frontendPath = path.join(__dirname, "../frontend/dist");

    // Serve static React files
    app.use(express.static(frontendPath));

    // Serve index.html for any unknown route
    app.get("*", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    connectDB(); // <-- ❗ REQUIRED
});
