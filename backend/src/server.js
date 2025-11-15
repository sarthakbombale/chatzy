import express from "express";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000;

// Parse JSON body
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
    console.log(`Server running on port ${PORT}`);
});
