import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSocket from "../hooks/useSocketManager";

const ReceiveBlob = () => {
  const { roomId } = useParams();
  const socket = useSocket();

  const [fileURL, setFileURL] = useState(null);

  useEffect(() => {
    if (roomId) {
      socket.connectToSocket();
    }
  }, []);

  useEffect(() => {
    if (socket.socket) {
      socket.socket.on("connect", () => {
        console.log("[socket connected]");

        socket.joinSocketRoom(roomId, (data) => {
          console.log("[client joined to qr group]", data);
        });

        socket.socket.on("GET_FILE_DATA", ({ data }) => {
          console.log("[File receved from client]", data);
          setFileURL(data.url);
        });
      });
    }
  }, [socket.socket]);

  return fileURL ? (
    <h3>File received from client</h3>
  ) : (
    <h3>Waiting for file to receive</h3>
  );
};

export default ReceiveBlob;
