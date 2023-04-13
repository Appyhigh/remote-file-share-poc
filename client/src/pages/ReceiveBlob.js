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
        alert('socket')
        socket.joinSocketRoom(roomId, (data) => {
          console.log("[client joined to qr group]", data);
        });
      });
        socket.socket.on( "GET_FILE_DATA", ( { data } ) => {
          console.log( "[File receved from client]", data );
          var img = new Image();
          img.src = 'data:image/jpeg;base64,' + data.buffer;
          // ctx.drawImage( img, 0, 0 );
          setFileURL( img.src );
        } );
     
    }
  }, [socket.socket]);
  const fileSubmitHandler = ( event ) => {
    event.preventDefault();
    const blob = event.target[ "send-file" ].files[ 0 ];
    socket.socket.emit( "UPLOAD_FILE", { roomId, blob }, ( data ) => {
      alert('roomId')
      console.log( data );
    } );
  };
  console.log( '-------------------------' );
  console.log(fileURL);
  console.log('-------------------------');
  return (
    <form onSubmit={ fileSubmitHandler }>
      <img src={ fileURL}/>
      <input type="file" name="send-file" />
      <button type="submit">Share</button>
    </form>
  )
};

export default ReceiveBlob;
