const app = require("./src/app")
const { createServer } = require('node:http');
const server = createServer(app);

const PORT =8002;



server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


