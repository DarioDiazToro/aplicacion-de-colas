//Referencias HTML
const lblEscritorio = document.querySelector("h1");
const btnAtender = document.querySelector("button");
const lblTicket = document.querySelector("small");
const lblPendientes = document.querySelector("#lblPendientes");
const divAlert = document.querySelector(".alert");

const params = new URL(document.location.toString()).searchParams;

if (!params.has("escritorio")) {
  window.location = "index.html";
  throw new Error("El escritorio es obligatorio");
}
const escritorio = params.get("escritorio");
lblEscritorio.innerText = escritorio[0].toUpperCase() + escritorio.slice(1);

divAlert.style.display = "none";
const socket = io();

socket.on("connect", () => {
  btnAtender.disabled = false;
});

socket.on("disconnect", () => {
  btnAtender.disabled = true;
});

socket.on("tickets-pendientes", (pendientes) => {
  if (pendientes === 0) {
    lblPendientes.style.display = "none";
  } else {
    lblPendientes.style.display = "";
    lblPendientes.innerText = pendientes;
  }
});
btnAtender.addEventListener("click", () => {
  socket.emit("atender-ticket", { escritorio }, ({ ok, ticket, msg }) => {
    if (!ok) {
      lblTicket.innerText = "Nadie.";
      return (divAlert.style.display = "");
    }

    lblTicket.innerText = "Ticket " + ticket.numero;
  });
});
