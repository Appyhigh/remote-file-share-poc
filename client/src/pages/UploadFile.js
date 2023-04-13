import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import useSocket from "../hooks/useSocketManager";

const UploadFile = () => {
  const { roomId } = useParams();
  const socket = useSocket();
  const inputRef = useRef();
  const buttonRef = useRef();
  const [ file, setFile ] = useState();
  const [ fileURL, setFileURL ] = useState( null );

  useEffect( () => {
    if ( roomId ) {
      socket.connectToSocket();
    }
  }, [] );

  useEffect( () => {
    if ( socket.socket ) {
      socket.socket.on( "connect", () => {
        console.log( "[socket connected]" );
        socket.joinSocketRoom( roomId, ( data ) => {
          console.log( "[client joined to qr group]", data );
          // inputRef.current.click();
          // buttonRef.current.click();
        } );
      } );
      socket.socket.on( "GET_FILE_DATA", ( { data } ) => {
        console.log( "[File receved from client]", data );
        var img = new Image();
        img.src = 'data:image/jpeg;base64,' + data.buffer;
        // ctx.drawImage( img, 0, 0 );
        setFileURL( img.src );
      } );

    }
    console.log(inputRef.current);
    
  }, [ socket.socket ] );

  // const handleFileChange = ( e ) => {
  //   if ( e.target.files ) {
  //     setFile( e.target.files[ 0 ] );
  //   }
  // };

  // const handleUploadClick = () => {
  //   if ( !file ) {
  //     return;
  //   }
  // }
  const fileSubmitHandler = ( event ) => {
    event.preventDefault();
    const blob = event.target.files[ 0 ];
    console.log(blob);
    socket.socket.emit( "UPLOAD_FILE", { roomId, blob }, ( data ) => {
      console.log( roomId )
      console.log( data );
    } );
  };
  console.log( '-------------------------' );
  console.log( fileURL );
  console.log( '-------------------------' );
  // return (
  //   <form onSubmit={ fileSubmitHandler }>
  //     <img src={ fileURL } />
  //     <input type="file" name="send-file" ref={ inputRef } />
  //     <button type="submit">Share</button>
  //   </form>
  // )

  const handleUploadClick = () => {
    // 👇 We redirect the click event onto the hidden input element
    inputRef.current?.click();
  };

  const handleFileChange = ( e ) => {
    // if ( !e.target.files ) {
    //   return;
    // }
    console.log( e.target.files[ 0 ] );
    // setFile( e.target.files[ 0 ] );
    fileSubmitHandler(e)
    // 🚩 do the file upload here normally...
  };
  return (
    <div className='qrDiv'>
      {/* 👇 Our custom button to select and upload a file */ }
      <button onClick={ handleUploadClick } ref={ buttonRef } className='selectButton'>
        { 'Click to select a image' }
      </button>

      {/* 👇 Notice the `display: hidden` on the input */ }
      <input
        type="file"
        ref={ inputRef }
        onChange={ handleFileChange }
        style={ { display: 'none' } }
      />
    </div>
  );
};

export default UploadFile;
