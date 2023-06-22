import express from "express";
import { Server as SocketServer } from "socket.io";
import http from "node:http";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

io.on("connect", (socket) => {
  console.log(socket.id);

  socket.on("message", (data) => {
    socket.broadcast.emit("message", {
      body: data,
      from: socket.id.slice(6),
    });
  });
});

server.listen(3000);
console.log("Server running");
