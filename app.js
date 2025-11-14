import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes, { initUserRoutes } from "./routes/users.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Підключаємо MongoDB перед реєстрацією маршрутів
const startServer = async () => {
    const db = await connectDB();

    // ініціалізуємо маршрути users, передаючи db
    app.use("/users", initUserRoutes(db));

    app.get("/", (req, res) => {
        res.send("Home-work-67 API is running");
    });

    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
};

startServer();
