let rooms = {};

const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.currentRoom = null;

    socket.on("join-port", (roomId) => {
      // ✅ FIX: use socket.currentRoom
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

    socket.on("leave-port", (portId) => {
      socket.leave(portId);

      // clear only this user's UI
      socket.emit("receive-text", "");

      socket.currentRoom = null;
    });

    socket.on("clear-room", (portId) => {
      rooms[portId] = "";

      // ✅ FIX: send to everyone including sender
      io.to(portId).emit("receive-text", "");
    });

    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });
};

module.exports = socketHandler;