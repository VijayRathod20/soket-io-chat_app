const express = require("express");
const app = express();
const port = 3000;
const socket = require("socket.io");

const server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

app.use(express.static("public"));

//socket setup
const io = socket(server);

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });
});

app.get("/chat", (req, res) => {
  res.sendFile(
    "/home/vijay-rathod/Documents/Soket-io-chatApp/public/index.html"
  );
});
