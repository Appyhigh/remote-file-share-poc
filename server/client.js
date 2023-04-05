const SERVER_URL = "http://localhost:6000";
const ROOM_ID = "3dacf85b-c8ad-478d-b184-b120d43fed9f";

const io = require("socket.io-client");

const socket = io(SERVER_URL, { transports: ["websocket"] });

const joinQRGroup = (socket) => {
  socket.emit("CONNECT_QR", { roomId: ROOM_ID }, (data) => {
    console.log(data);
  });
};

socket.on("connect", () => {
  console.log("[Socket connected]");
  /** call test event */
  joinQRGroup(socket);
});
