import { cargarChat, onNuevoChat, onSelectChat } from "./socket.js";
import { onHandleSubmit, renderChat, appendChat, fillForm } from "./ui.js";

onNuevoChat(appendChat);
cargarChat(renderChat);
onSelectChat(fillForm);

const chatForm = document.querySelector("#chatForm");
chatForm.addEventListener("submit", onHandleSubmit);
