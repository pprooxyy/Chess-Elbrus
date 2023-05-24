function setReconnectSocket(chatSocket) {
  chatSocket.on("connection", (socket) => {
    console.log(`⚡: user just connected! USER`, socket);
    socket.on("reconnect", (data) => {
      chatSocket.emit("message-reconnect-response", data);
    });

    // socket.on("disconnect", () => {
    //   console.log("🔥: A user disconnected");
    //   users = users.filter((user) => user.socketID !== socket.id);
    //   chatSocket.emit("newUserResponse", users);
    //   socket.disconnect();
    // });
  });
}

module.exports = setReconnectSocket;
