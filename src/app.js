import dotenv from "dotenv";
dotenv.config();
import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import path from "path";
import handlebars from "express-handlebars";
import passport from "passport";
import "./database/database.js";
import { loginStrategy, signupStrategy } from "./middlewares/passportLocal.js";
import compression from "compression";
import logger from "./utils/loggers.js";
import routerInfo from "./routes/routeInfo.js";
import routeUser from "./routes/routeUser.js";
import routeProduct from "./routes/routeProduct.js";
import routeCart from "./routes/routeCart.js";
import routeChat from "./routes/routeChat.js";
import cors from 'cors';
import { createRoles } from "./utils/initialSetup.js";
import authRouter from "./routes/auth.routes.js";
const app = express();
createRoles();


/*============================[Middlewares]============================*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(cors());
app.use(
  session({
    secret: process.env.SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: Number(process.env.EXPIRATION_TIME) || 60 * 60 * 10000,
    },
  })
);
passport.use("login", loginStrategy);
passport.use("signup", signupStrategy);
app.use(passport.initialize());
app.use(passport.session());

/*=======================[Motor de Plantillas]=======================*/
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
  })
);
app.set("view engine", "hbs");
app.set("views", "./views");

/*============================[Rutas Info]============================*/
app.use("/", routerInfo);

/*============================[Rutas API]============================*/
app.use("/", routeUser);
app.use("/api", routeProduct);
app.use("/api", routeCart);
app.use("/api/auth", authRouter);
/*============================[Rutas Chat]============================*/
app.use(express.static("public"));
app.use("/chat", express.static("public"));
app.use("/chats", routeChat);


/*======================[Demás rutas indefinidas]======================*/
app.get("*", (req, res) => {
  logger.warn({
    404: `${req.method} ${req.url}`,
  });
  res.status(404).send("Error 404: ruta no definida");
});

export default app;