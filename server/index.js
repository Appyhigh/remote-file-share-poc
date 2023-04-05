const http = require("http");
require("dotenv").config();
const app = require("express")();
const server = http.createServer(app);

/**socket event */
const socketEvent = require("./handler/index");

/** Socket io object */
const io = require("socket.io")(server, {
  maxHttpBufferSize: 7e6,
  transports: ["websocket", "polling"],
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socketEvent(io, socket);
});

server.listen(process.env.SERVER_PORT, () => {
  console.log("SERVER RUNNING ON PORT", process.env.SERVER_PORT);
});
