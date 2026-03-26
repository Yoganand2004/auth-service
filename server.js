const app = require("./src/app")
const cors = require("cors");
const { createServer } = require('node:http');
const {Server} = require("socket.io")

app.use(cors())
const server = createServer(app);

const PORT =8002;
const socketHandler  = require("./src/WebSocket/Socket") 
const io = new Server(server , {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
})
socketHandler(io);


server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


