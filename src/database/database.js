import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import logger from "../utils/loggers.js";

const mongoDB_URI =
  process.env.MONGO_URI || "mongodb+srv://Seba:Seba123@cluster0.coymqb5.mongodb.net/?retryWrites=true&w=majority";

(async () => {
  try {
    const db = await mongoose.connect(mongoDB_URI);
    logger.info(
      "Conectado a mongoDB " +
        db.connection.host +
        ":" +
        db.connection.port +
        "/" +
        db.connection.name
    );
  } catch (error) {
    logger.error(error);
  }
})();
