import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

 app.use(express.json());  
app.use(cookieParser())

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// -----------------------------
// ⭐ ALWAYS SERVE FRONTEND BUILD
// -----------------------------
const frontendPath = path.join(__dirname, "../../frontend/dist");


app.use(express.static(frontendPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// -----------------------------
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    connectDB();
});

