import "./config/env.js"; // Valida o .env antes de carregar o app
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

// Routes
import lectureRoutes from "./routes/LectureRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import userRoutes from "./routes/UserRoutes.js";
import libraryRoutes from "./routes/LibraryRoutes.js";
import calendarEventRoutes from "./routes/CalendarEventRoutes.js";
import cartRoutes from "./routes/CartRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import commentRoutes from "./routes/CommentRoutes.js";
import facilitatorRoutes from "./routes/FacilitatorRoutes.js";
import favoriteRoutes from "./routes/FavoriteRoutes.js";
import groupOfStudyRoutes from "./routes/GroupOfStudyRoutes.js";
import topicRoutes from "./routes/TopicRoutes.js";
import loanRoutes from "./routes/LoanRoutes.js";
import postRoutes from "./routes/PostRoutes.js";
import reserveRoutes from "./routes/ReserveRoutes.js";
import volunteerWorkRoutes from "./routes/VolunteerWorkRoutes.js";
import reviewSocietyRoutes from "./routes/ReviewSocietyRoutes.js";
import notificationRoutes from "./routes/NotificationRoutes.js";

import { connectedDataBase } from "./config/sequelize.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const port = process.env.PORT || 3001;

// Middlewares de Segurança
app.use(helmet()); // Adiciona headers de segurança (protege contra clicks, scrpts maliciosos, etc)

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutos
	limit: 100, // Limita cada IP a 100 requisições por janela
	standardHeaders: 'draft-7',
	legacyHeaders: false,
  message: "Muitas requisições vindas deste IP, tente novamente em 15 minutos."
});
app.use(limiter); // Impede ataques de força bruta

app.use(cors());
app.use(express.json());

// Registering Routes with correct prefixes matching legacy logic
app.use("/lectures", lectureRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/library", libraryRoutes);
app.use("/calendar", calendarEventRoutes); 
app.use("/cart", cartRoutes);          
app.use("/category", categoryRoutes);       
app.use("/comments", commentRoutes);       
app.use("/facilitadores", facilitatorRoutes);   
app.use("/favorite", favoriteRoutes);      
app.use("/groupOfStudy", groupOfStudyRoutes);  
app.use("/topic", topicRoutes);         
app.use("/loan", loanRoutes);          
app.use("/postMessages", postRoutes);          
app.use("/reserves", reserveRoutes);       
app.use("/work", volunteerWorkRoutes); 
app.use("/reviewSociety", reviewSocietyRoutes); 
app.use("/notifications", notificationRoutes);  

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
