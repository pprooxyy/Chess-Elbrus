function setupChatSocket(chatSocket) {
  let users = [];
  chatSocket.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on("message", (data) => {
      chatSocket.emit("messageResponse", data);
    });

    socket.on("typing", (data) =>
      socket.broadcast.emit("typingResponse", data)
    );

    socket.on("newUser", (data) => {
      users.push(data);
      chatSocket.emit("newUserResponse", users);
    });

    socket.on("disconnect", () => {
      console.log("🔥: A user disconnected");
      users = users.filter((user) => user.socketID !== socket.id);
      chatSocket.emit("newUserResponse", users);
      socket.disconnect();
    });
  });
}

module.exports = setupChatSocket;
