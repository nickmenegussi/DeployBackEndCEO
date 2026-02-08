import "dotenv/config";
import express from "express";
import cors from "cors";

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

app.use(cors());
app.use(express.json());

// Registering Routes with correct prefixes matching legacy logic
app.use("/lectures", lectureRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/library", libraryRoutes);
app.use("/", calendarEventRoutes); // Prefix is handled inside for /calendar path
app.use("/", cartRoutes);          // Prefix is handled inside for /cart path
app.use("/", categoryRoutes);      // Prefix is handled inside for /category path
app.use("/", commentRoutes);       // Prefix is handled inside for /comments path
app.use("/", facilitatorRoutes);   // Prefix is handled inside for /facilitadores path
app.use("/", favoriteRoutes);      // Prefix is handled inside for /favorite path
app.use("/", groupOfStudyRoutes);  // Prefix is handled inside for /groupOfStudy path
app.use("/", topicRoutes);         // Prefix is handled inside for /topic path
app.use("/", loanRoutes);          // Prefix is handled inside for /loan path
app.use("/", postRoutes);          // Prefix is handled inside for /postMessages path
app.use("/", reserveRoutes);       // Prefix is handled inside for /reserves path
app.use("/", volunteerWorkRoutes); // Prefix is handled inside for /work path
app.use("/", reviewSocietyRoutes); // Prefix is handled inside for /reviewSociety path
app.use("/", notificationRoutes);  // Prefix is handled inside for /notifications and /admin paths

app.post("/user/register", userRoutes); // Just in case, but already in userRoutes

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
