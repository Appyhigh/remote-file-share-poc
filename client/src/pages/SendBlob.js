import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import useSocket from "../hooks/useSocketManager";

const SendBlob = () => {
  const socket = useSocket();

  const [roomId] = useState(uuid());

  

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
      <QRCodeCanvas size={ 600 } value={`http://31.220.59.159/file/${roomId}`} />
      
    </div>
  );
};

export default SendBlob;
