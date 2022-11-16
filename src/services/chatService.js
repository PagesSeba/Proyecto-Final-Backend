import logger from "../utils/loggers.js";
import chatDao from "../daos/chatDao.js";

class chatService {
  async getChats() {
    try {
      const chats = await chatDao.getChats();
      return chats;
    } catch (e) {
      logger.error(e);
    }
  }
  async createChat(message) {
    try {
      const chat = await chatDao.createChat(message);
      return chat;
    } catch (e) {
      logger.error(e);
    }
  }
}
export default new chatService();
