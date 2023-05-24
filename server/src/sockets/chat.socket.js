function setupChatSocket(chatSocket) {
  let users = [];
  chatSocket.on("connect", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on("message", (data) => {
      console.log(data);
      socket.broadcast.emit("messageResponse", data);
    });

    socket.on("typing", (data) =>
      socket.broadcast.emit("typingResponse", data)
    );

    socket.on("newUser", (data) => {
      users.push(data);

      socket.broadcast.emit("messageResponse", {
        notification: true,
        text: `new user ${data.name} connected`,
      });
      // socket.broadcast.emit("newUserResponse", users);
    });

    socket.on("disconnect", () => {
      console.log("🔥: A user disconnected");
      users = users.filter((user) => user.socketID !== socket.id);
      socket.disconnect();
    });
  });
}

module.exports = setupChatSocket;
