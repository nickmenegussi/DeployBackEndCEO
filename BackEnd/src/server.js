require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Middleware de logging personalizado
app.use((req, res, next) => {
  console.log('📥 NOVA REQUISIÇÃO:', {
    method: req.method,
    url: req.url,
    body: req.body,
    headers: req.headers,
    timestamp: new Date().toISOString()
  });
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/uploads", express.static("./uploads"));

// Middleware de logging para rotas
const logRoute = (req, res, next) => {
  const originalSend = res.send;
  res.send = function(data) {
    console.log('📤 RESPOSTA ENVIADA:', {
      status: res.statusCode,
      url: req.url,
      method: req.method,
      data: data,
      timestamp: new Date().toISOString()
    });
    originalSend.call(this, data);
  };
  next();
};

// Aplicar logging a todas as rotas
app.use(logRoute);

// Importar routers
const userRouter = require("./routers/UserRouter");
const adminRouter = require("./routers/AdminRouter");
const calendarRouter = require("./routers/CalendarEventsRouter");
const libraryRouter = require("./routers/LibraryRouter");
const volunteerWorkRouter = require("./routers/VolunteerWorkRouter");
const topicPostRouter = require("./routers/TopicRouter");
const postRouter = require("./routers/PostMessageRouter");
const cart = require("./routers/CartRouter");
const reserves = require("./routers/ReservesRouter");
const otpRouter = require("./routers/OtpRouter");
const notifications = require("./routers/Notifications");
const facilitadores = require("./routers/FacilitadoresUser");
const loans = require("./routers/LoansRouter");
const comments = require("./routers/CommentsRouter");
const lecture = require("./routers/LectureRouter");
const auth = require("./routers/AuthRouter");
const review = require("./routers/ReviewRouter");
const category = require("./routers/CategoryRouter");
const favorite = require("./routers/FavoriteRouter");
const groupOfStudy = require("./routers/GroupOfStudyRouter");

// Usar routers com logging
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

// Rota de health check com teste de banco
app.get('/', async (req, res) => {
  try {
    console.log('🔍 Testando conexão com banco...');
    const connection = require("./config/db");
    
    // Testar conexão com banco
    const [result] = await connection.promise().query('SELECT 1 + 1 AS result');
    
    console.log('✅ Conexão com banco OK:', result[0].result);
    
    res.json({
      message: '🚀 API Online!',
      status: 'Online',
      database: 'Conectado',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    console.error('❌ Erro no banco:', error);
    res.status(500).json({
      message: 'API Online mas Banco Offline',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Rota de debug para testar erros
app.get('/debug', (req, res) => {
  console.log('🔧 Rota de debug acionada');
  res.json({
    status: 'Debug OK',
    database: process.env.MYSQL_ADDON_DB,
    host: process.env.MYSQL_ADDON_HOST,
    timestamp: new Date().toISOString()
  });
});

// Middleware de tratamento de erros global
app.use((error, req, res, next) => {
  console.error('💥 ERRO GLOBAL:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    body: req.body,
    timestamp: new Date().toISOString()
  });
  
  res.status(500).json({
    message: "Erro interno do servidor",
    success: false,
    error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  console.log('❌ Rota não encontrada:', req.originalUrl);
  res.status(404).json({
    message: "Rota não encontrada",
    success: false,
    requestedUrl: req.originalUrl
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('🚀 =================================');
  console.log('🚀 SERVER INICIADO COM LOGS DETALHADOS');
  console.log('🚀 Porta:', port);
  console.log('🚀 Ambiente:', process.env.NODE_ENV || 'development');
  console.log('🚀 Banco:', process.env.MYSQL_ADDON_DB || 'Não configurado');
  console.log('🚀 =================================');
  console.log(`📚 Swagger: http://localhost:${port}/api-docs`);
  console.log(`🔧 Debug: http://localhost:${port}/debug`);
});