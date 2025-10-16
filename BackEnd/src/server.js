require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { initializerSocket, getIO } = require("./socket/index");
const dotenv = require("dotenv");
const isDev = process.env.NODE_ENV !== "production"
const port = isDev ? process.env.PORT : parseInt(process.env.MYSQL_ADDON_PORT)

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
const path = require("path");
const groupOfStudy = require("./routers/GroupOfStudyRouter");
const { group } = require("console");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./docs/swagger.json");

const app = express();

// ✅ MIDDLEWARE CORS DEVE VIR PRIMEIRO
app.use(cors({
  origin: true, // Permite qualquer origem
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// ✅ HANDLER EXPLÍCITO PARA PREFLIGHT REQUESTS
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).send();
});

// ✅ SEU MIDDLEWARE NORMAL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/swagger-ui', express.static('node_modules/swagger-ui-dist/'));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, {
  customCssUrl: '/swagger-ui/swagger-ui.css',
  customJs: [
    '/swagger-ui/swagger-ui-bundle.js',
    '/swagger-ui/swagger-ui-standalone-preset.js'
  ]
}));
app.use("/uploads", express.static("./uploads"));
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
// app.use('/likes', likeMessages)
app.use("/lectures", lecture);
app.use("/review", review);
app.use("/auth", auth);
app.use("/favorite", favorite);
app.use("/category", category);
app.use("/groupOfStudy", groupOfStudy);

app.get('/', (req, res) => {
    return res.send('Bem-vindo à minha API!');
})

app.listen(port, () =>
  console.log(
    `Rodando na porta ${port}\nDocumentação do Swagger disponível em http://localhost:${port}/api-docs`
  )
);