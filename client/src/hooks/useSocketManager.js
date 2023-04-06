import { useState } from "react";
import { io } from "socket.io-client";

const useSocketManager = (roomId) => {
  const [socket, setSocket] = useState(null);

  const connectToSocket = () => {
    const socketObject = io(process.env.REACT_APP_SERVER_URL, {
      transports: ["polling", "websocket", "http"],
    });
    setSocket(socketObject);
  };

  const joinSocketRoom = (roomId, callback) => {
    socket.emit("CONNECT_QR", { roomId }, (data) => {
      callback(data);
    });
  };

  return {
    connectToSocket,
    joinSocketRoom,
    socket,
  };
};

export default useSocketManager;
