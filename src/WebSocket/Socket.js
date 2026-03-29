let rooms = {};

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.currentRoom = null;

    socket.on("join-port", (roomId) => {
      if (socket.currentRoom) {
        socket.leave(socket.currentRoom);
      }

      socket.join(roomId);
      socket.currentRoom = roomId;

      if (!rooms[roomId]) rooms[roomId] = "";

      socket.emit("load-text", rooms[roomId]);
    });

    socket.on("send-text", ({ roomId, text }) => {
      rooms[roomId] = text;
      socket.to(roomId).emit("receive-text", text);
    });

    socket.on("leave-port", (roomId) => {
      socket.leave(roomId);

      // check if room is empty
      const room = io.sockets.adapter.rooms.get(roomId);

      if (!room || room.size === 0) {
        delete rooms[roomId]; // ✅ remove room completely
      }

      socket.currentRoom = null;
      socket.emit("receive-text", "");
    });

    socket.on("clear-room", (roomId) => {
      rooms[roomId] = "";
      io.to(roomId).emit("receive-text", "");
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);

      const roomId = socket.currentRoom;

      if (roomId) {
        const room = io.sockets.adapter.rooms.get(roomId);

        // after disconnect, check if anyone is left
        if (!room || room.size === 0) {
          delete rooms[roomId]; // ✅ clear text when last user leaves
          console.log(`Room ${roomId} cleared`);
        }
      }
    });
  });
};

module.exports = socketHandler;