import { Router } from "express";
import * as authController from "../controllers/authController.js";
import {checkifUserExist } from "../middlewares/verifySignup.js"
import {checkIfRoleExist } from "../middlewares/verifySignup.js"
const authRouter = Router();

authRouter.post('/login', authController.login);
authRouter.post('/signup', [checkifUserExist, checkIfRoleExist], authController.signup);

export default authRouter;
