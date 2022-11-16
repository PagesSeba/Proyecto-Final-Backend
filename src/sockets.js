//import {Chat} from "./models/Chat.js";

// export default (io) => {

//     io.on('connection', async (socket) => {

//         const message = await Chat.find();

//         // const message = await chat.loadMessage()
//          socket.emit('messages', message )

//          socket.on('message-new', async (data) => {
//             await Chat.save(data)
//             const message2=await Chat.find()
//             io.sockets.emit('messages', message2)
//          })
       
//         // socket.on('message-new',async data => {
//         //     await chat.saveMessage(data)
//         //     const message2 = await chat.loadMessage()
//         //     io.sockets.emit('messages', message2 );
//         // });
//       })

// }

import Chat from "./models/Chat.js";

export default (io) => {
  io.on("connection", (socket) => {
    const emitChats = async () => {
      const chats = await Chat.find();
      io.emit("server:cargaChat", chats);
    };

    emitChats();

    socket.on('client:nuevoChat', async (data) => {
        const nuevoChat = new Chat (data)
        const chatGuardado =  await nuevoChat.save()
        io.emit('server:nuevoChat', chatGuardado)
    })

    socket.on('client:deleteChat', async (id) => {
        const chat = await Chat.findByIdAndDelete(id) 
        emitChats();
    })

    socket.on('client:getChat', async (id) => {
        const chat = await Chat.findById(id) 
        io.emit('server:chatSeleccionado', chat)
    })

    socket.on('client:updateChat', async (data) =>{
      await Chat.findByIdAndUpdate(data._id, {
        email: data.email,
        message: data.message
        })
        emitChats()
    })
  });
};