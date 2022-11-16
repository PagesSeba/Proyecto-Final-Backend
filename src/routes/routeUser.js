import { Router } from "express";
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";
import userController from "../controllers/userController.js";
import multer from "multer";
const storageStrategy = multer.memoryStorage();
const upload = multer({ storage: storageStrategy });

const routeUser = Router();
/*============================[Rutas API: /]============================*/
routeUser.get("/", isAuth, userController.getHome);
routeUser.get("/productos", isAuth, userController.productos);
routeUser.get("/login", userController.login);
routeUser.get("/login-error", userController.loginError);
routeUser.get("/registro", userController.registro);
routeUser.get("/registro-error", userController.registroError);
routeUser.get("/logout", isAuth, userController.logout);
routeUser.post(
  "/login",
  passport.authenticate("login", { failureRedirect: "/login-error" }),
  userController.loginPost
);
routeUser.post(
  "/registro",
  upload.single("image"),
  passport.authenticate("signup", { failureRedirect: "/registro-error" }),
  userController.registroPost
);

/*=========================[NUEVAS RUTAS API: /]=========================*/
routeUser.get("/api/users", userController.getAllUsers);
routeUser.get("/api/users/:id", userController.getUserById);
routeUser.get("/api/users/:id/image", userController.getUserImage);
routeUser.put("/api/users/:id", userController.updateUser);
routeUser.delete("/api/users/:id", userController.deleteUser);


export default routeUser;
