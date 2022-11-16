import { Router } from "express";
import chatController from "../controllers/chatController.js";

const routeChat = Router();

routeChat.get("/", chatController.getChats);
routeChat.post("/", chatController.createChat);

export default routeChat;
