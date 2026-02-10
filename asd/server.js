const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname));

io.on("connection", socket => {
    console.log("✅ Cliente conectado");

    socket.on("subtitle", d => io.emit("subtitle", d));
    socket.on("title", d => io.emit("title", d));
    socket.on("ticker", d => io.emit("ticker", d));
    socket.on("temp", d => io.emit("temp", d));

    socket.on("toggleSubtitle", d => io.emit("toggleSubtitle", d));
    socket.on("toggleTitle", d => io.emit("toggleTitle", d));
});

server.listen(3000, () => {
    console.log("🚀 Servidor activo");
    console.log("OBS → http://localhost:3000");
    console.log("Panel → http://localhost:3000/panel.html");
});
