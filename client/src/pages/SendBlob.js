import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import useSocket from "../hooks/useSocketManager";

const SendBlob = () => {
  const socket = useSocket();

  const [roomId] = useState(uuid());

  const fileSubmitHandler = (event) => {
    event.preventDefault();
    const blob = event.target["send-file"].files[0];
    socket.socket.emit("UPLOAD_FILE", { roomId, blob }, (data) => {
      console.log(data);
    });
  };

  useEffect(() => {
    socket.connectToSocket();
  }, []);

  useEffect(() => {
    if (socket.socket) {
      socket.socket.on("connect", () => {
        console.log("[socket connected]");
      });

      // socket.socket.on("SOCKET_CONNECTED", () => {
      //   console.log("[socket connected - 2]");
      // });

      socket.joinSocketRoom(roomId, (data) => {
        console.log(data);
      });
    }
  }, [socket.socket]);

  return (
    <div>
      <QRCodeCanvas size={600} value={roomId} />
      <form onSubmit={fileSubmitHandler}>
        <input type="file" name="send-file" />
        <button type="submit">Share</button>
      </form>
    </div>
  );
};

export default SendBlob;
