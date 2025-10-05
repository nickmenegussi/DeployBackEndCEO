require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// CORS liberado para todas as origens
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Importar routers (SEM socket.io)
const userRouter = require("../routers/UserRouter");
const adminRouter = require("../routers/AdminRouter");
const calendarRouter = require("../routers/CalendarEventsRouter");
const libraryRouter = require("../routers/LibraryRouter");
const volunteerWorkRouter = require("../routers/VolunteerWorkRouter");
const topicPostRouter = require("../routers/TopicRouter");
const postRouter = require("../routers/PostMessageRouter");
const cart = require("../routers/CartRouter");
const reserves = require("../routers/ReservesRouter");
const otpRouter = require("../routers/OtpRouter");
const notifications = require("../routers/Notifications");
const facilitadores = require("../routers/FacilitadoresUser");
const loans = require("../routers/LoansRouter");
const comments = require("../routers/CommentsRouter");
const lecture = require("../routers/LectureRouter");
const auth = require("../routers/AuthRouter");
const review = require("../routers/ReviewRouter");
const category = require("../routers/CategoryRouter");
const favorite = require("../routers/FavoriteRouter");
const groupOfStudy = require("../routers/GroupOfStudyRouter");

// Usar routers
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/calendar", calendarRouter);
app.use("/library", libraryRouter);
app.use("/volunteerWork", volunteerWorkRouter);
app.use("/topic", topicPostRouter);
app.use("/post", postRouter);
app.use("/cart", cart);
app.use("/reserves", reserves);
app.use("/loan", loans);
app.use("/otp", otpRouter);
app.use("/notifications", notifications);
app.use("/facilitadores", facilitadores);
app.use("/comments", comments);
app.use("/lectures", lecture);
app.use("/review", review);
app.use("/auth", auth);
app.use("/favorite", favorite);
app.use("/category", category);
app.use("/groupOfStudy", groupOfStudy);

// Rota de health check melhorada
app.get('/', (req, res) => {
  res.json({
    message: '🚀 API Online no Vercel!',
    status: 'Online', 
    database: process.env.MYSQL_ADDON_DB ? 'Conectado' : 'Erro',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production'
  });
});

// Rota de teste do banco
app.get('/test-db', async (req, res) => {
  try {
    const connection = require("../config/db");
    const [results] = await connection.promise().query('SELECT 1 + 1 AS result');
    
    res.json({
      success: true,
      message: "✅ Banco conectado!",
      database: process.env.MYSQL_ADDON_DB,
      result: results[0].result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "❌ Erro no banco",
      error: error.message,
      database: process.env.MYSQL_ADDON_DB
    });
  }
});

// Rota original do teste
app.get("/teste", (req, res) => {
  res.send("Bem-vindo à API do Fórum!");
});

// Export para Vercel (IMPORTANTE)
module.exports = app;