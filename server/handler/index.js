const fs = require( 'fs/promises' );
const path = require( 'path' );
const blobShareEvent = ( _io, socket ) => {
  /** Event to connect QR */
  socket.on("CONNECT_QR", ({ roomId }, callback) => {
    try {
      socket.join(roomId, () => {
        console.log("[rooms]", socket.rooms);
      });

      console.log("[client joined to socket room]", roomId, socket.rooms);

      callback({
        message: "Client joined to QR group",
      });
    } catch (error) {
      console.log("[error]", error);
    }
  });
  const generateRandom = () => Math.random().toString( 36 ).substring( 2, 15 ) + Math.random().toString( 23 ).substring( 2, 5 );
  /** Event to receive file from client */
  socket.on("UPLOAD_FILE", async ({ roomId, blob }, callback) => {
    try {
      let img = generateRandom();
      console.log( 'upoad file event emitted' );
      const dirPath = path.join( __dirname, '../../images' );
      await fs.writeFile( `${dirPath}/${img}.jpg`, blob );
      if (!roomId || !blob) {
        callback({
          message: "Invalid paramter to share file",
        });
      } else {
        console.log('emitting to imageDATA');
        /** Upload blob to aws s3  - bucket
         * Generate presigned URL - Share to it receiving client
         *
         */

        /** Emit event to room */
        const imageDATA = await fs.readFile( `${dirPath}/${img}.jpg`, { encoding: 'base64' } );
        // console.log(imageDATA);
        socket.to( roomId ).emit( "GET_FILE_DATA", {
          message: "File received",
          data: { image: true, buffer:imageDATA }
        });
        callback({
          message: "File successfully received by server",
        });
      }
    } catch (error) {
      console.log("[Error]", error);
    }
  });
};

module.exports = blobShareEvent;
