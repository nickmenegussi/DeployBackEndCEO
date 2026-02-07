import "dotenv/config";
import express from "express";
import cors from "cors";
import lectureRoutes from "./routes/LectureRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import userRoutes from "./routes/UserRoutes.js"
import libraryRoutes from "./routes/LibraryRoutes.js"

import { connectedDataBase } from "./config/sequelize.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/lectures", lectureRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes)
app.use("/library", libraryRoutes)

app.get("/", (req, res) => {
  res.send("Bem-vindo à minha API!");
});

app.use(errorHandler);

// Só inicia o servidor se não estivermos rodando testes
if (process.env.NODE_ENV !== "test") {
  app.listen(port, async () => {
    console.log(`🚀 Rodando na porta ${port}`);
    await connectedDataBase();
  });
}

export default app;
