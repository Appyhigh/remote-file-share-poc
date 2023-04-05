const blobShareEvent = (_io, socket) => {
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

  /** Event to receive file from client */
  socket.on("UPLOAD_FILE", ({ roomId }, callback) => {
    try {
      if (!roomId) {
        callback({
          message: "File not received by server",
        });
      } else {
        console.log("[upload file emit room]", roomId);

        /** Emit event to room */
        socket.to(roomId).emit("GET_FILE_DATA", {
          message: "File received",
          data: {
            url: "some_url",
          },
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
