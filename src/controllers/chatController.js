import chatService from "../services/chatService.js";

class chatController {

    constructor() {
        this.chatService = chatService;
        this.chatMessages = [];
    }
    async getChats(req, res) {
        try {
            const chats = await chatService.getChats();
            res.status(200).send({chats});
        } catch (err) {
            res.status(500).send(err);
        }
    }

    async createChat(req, res) {
        try {
            const chats = await chatService.createChat(req.body);
            res.status(200).send({chats});
        } catch (err) {
            res.status(500).send(err);
        }
    }

}

export default new chatController();
