import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import useSocket from "../hooks/useSocketManager";

const Scan = () => {
  const socket = useSocket();
  const [ roomId ] = useState( uuid() );
  const [ isFetching, setFetching ] = useState( false );
  const [ fileURL, setFileURL ] = useState( null );
  useEffect( () => {
    socket.connectToSocket();
  }, [] );

  useEffect( () => {
    if ( socket.socket ) {
      socket.socket.on( "connect", () => {
        console.log( "[socket connected]" );
      } );
      socket.joinSocketRoom( roomId, ( data ) => {
        console.log( data );
      } );
      socket.socket.on( "GET_FILE_DATA", ( { data } ) => {
        console.log( "[File receved from client]", data );
        var img = new Image();
        img.src = 'data:image/jpeg;base64,' + data.buffer;
        // ctx.drawImage( img, 0, 0 );
        setFileURL( img.src );
        setFetching( false );
      } );
      socket.socket.on( 'FETCHING_FILE', (  data  ) => {
        console.log('fetching the file',data);
        setFetching( true );
        if ( data.message == 'FETCHING' ) {
        }
      } )
    }
  }, [ socket.socket ] );

  return (
    <div>
      <div className='qrDiv'>
        { isFetching ? <>Fethcing your image......</> : <>
          { fileURL ? <img src={ fileURL } className='uploadedImage' /> : <QRCodeCanvas size={ 300 } value={ `https://file-sharing.apyhi.com/file/${roomId}` } /> }</> }
      </div>
    </div >
  );
};

export default Scan;
