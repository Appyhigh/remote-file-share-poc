import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useSocket from "../hooks/useSocketManager";
const ReceiveBlob = () => {
  const navigate = useNavigate();
  const socket = useSocket();
  const [ fileURL, setFileURL ] = useState( null );
  const handleNavigation = (roomId) => {
    navigate(`/receive/${roomId}`);
    navigate(0);
  };
  useEffect( () => {
    if ( socket.socket ) {
      socket.socket.on( "connect", () => {
        console.log( "[socket connected]" );
      } );
      socket.socket.on( "GET_FILE_DATA", ( { data } ) => {
        console.log( "[File receved from client]", data );
        var img = new Image();
        img.src = 'data:image/jpeg;base64,' + data.buffer;
        // ctx.drawImage( img, 0, 0 );
        setFileURL( img.src );
      } );

    }
  }, [ socket.socket ] );
  return (
    <div style={ { width: "600px", height: "600px", padding:'20%' } } scanDelay="2000">
      <img src={ fileURL } />
      <QrReader
        onResult={(result) => {
          if (result) {
            handleNavigation(result.text);
          }
        }}
        style={{ width: "300px", height: "300px" }}
      />
    </div>
  );
};

export default ReceiveBlob;
