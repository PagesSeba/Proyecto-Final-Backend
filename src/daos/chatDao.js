import logger from "../utils/loggers.js";
import Chat from "../models/Chat.js";

class chatDao {

  async createChat(message) {
    try {
      logger.info("Guardando chat");
      const chatData = await Chat.create(message);
      return chatData;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  async getChats() {
    try {
      logger.info("Obteneiendo chats");
      const chats = await Chat.find({})
      return chats;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }
}

export default new chatDao();
