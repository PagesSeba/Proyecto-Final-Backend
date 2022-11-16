import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import logger from "./src/utils/loggers.js";
import cors from "cors";
import sockets from "./src/sockets.js"
import { Server as WebSocketServer } from "socket.io";
import http from "http";

/*============================[Servidor]============================*/
const PORT = process.env.PORT;
const server = http.createServer(app);
const httpServer = server.listen(PORT);
const io = new WebSocketServer(httpServer);
app.use(cors());
sockets(io)
logger.info(`Server running on http://localhost:${PORT}`);