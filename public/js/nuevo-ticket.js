//Referencias HTML

const lblNuevoTicket = document.querySelector("#lblNuevoTicket");
const btnClear = document.querySelector("button");

const socket = io();

socket.on("connect", () => {
  btnClear.disabled = false;
});

socket.on("disconnect", () => {
  btnClear.disabled = true;
});

socket.on("ultimo-ticket", (ultimoTicket) => {
  lblNuevoTicket.innerText = "Ticket " + ultimoTicket;
});

btnClear.addEventListener("click", () => {
  socket.emit("siguiente-ticket", null, (ticket) => {
    lblNuevoTicket.innerText = ticket;
  });
});
