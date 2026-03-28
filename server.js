const app = require("./src/app")
const cors = require("cors");
const { createServer } = require('node:http');
const {Server} = require("socket.io")

app.use(cors())
const server = createServer(app);

const PORT = process.env.PORT || 8002;

const socketHandler  = require("./src/WebSocket/Socket") 
const io = new Server(server , {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
})
socketHandler(io);

app.get("/", (req, res) => {
  res.send("WebSocket server running 🚀");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


