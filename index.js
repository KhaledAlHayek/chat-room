let express = require("express");
let socket = require("socket.io");

let app = express();

app.use(express.static("public"));

let server = app.listen(4000, () => {
  console.log("listening for requests on port 4000");
});

// socket setup
let io = socket(server);
io.on("connection", socket => {
  console.log("User Connected: ID - ", socket.id);
  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
});

