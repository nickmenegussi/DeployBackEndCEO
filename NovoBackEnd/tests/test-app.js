import "dotenv/config";
import express from "express";
import authRoutes from "../routes/AuthRoutes.js";
import { errorHandler } from "../middleware/errorHandler.js";

const app = express();

app.use(express.json());

// Carregamos APENAS as rotas de autenticação para o teste
app.use("/auth", authRoutes);

app.use(errorHandler);

export default app;
