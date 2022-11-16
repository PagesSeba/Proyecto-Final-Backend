const socket = io();

export const cargarChat = (callback) => {
  socket.on("server:cargaChat", callback);
};

export const guardarChat = (email, message) => {
  socket.emit("client:nuevoChat", {
    email,
    message,
  });
};

export const onNuevoChat = (callback) => {
  socket.on("server:nuevoChat", callback);
};

export const deleteChat = (id) => {
  socket.emit("client:deleteChat", id);
};

export const getChat = (id) => {
  socket.emit("client:getChat", id);
};

export const onSelectChat = (callback) => {
  socket.on("server:chatSeleccionado", callback);
};

export const updateChat = (id, email, message) => {
  socket.emit("client:updateChat", {
    _id: id,
    email,
    message,
  });
};