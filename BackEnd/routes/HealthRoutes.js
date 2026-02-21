import { Router } from "express";
import sequelize from "../config/sequelize.js";

const router = Router();

router.get("/health", async (req, res) => {
    try {
        // Tenta uma consulta simples para verificar se o banco responde
        await sequelize.authenticate();

        return res.status(200).json({
            status: "UP",
            database: "Connected",
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || "development"
        });
    } catch (error) {
        return res.status(503).json({
            status: "DOWN",
            database: "Disconnected",
            error: process.env.NODE_ENV === "production" ? "Internal Database Error" : error.message,
            timestamp: new Date().toISOString()
        });
    }
});

export default router;
