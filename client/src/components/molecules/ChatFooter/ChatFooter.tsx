import React, { useState } from "react";

function ChatFooter({ socket }: any) {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e: any) => {
    const userName = localStorage.getItem("userName");
    const userId = localStorage.getItem("userId");
    const roomId = localStorage.getItem("roomId");
    e.preventDefault();
    if (message.trim() && userName) {
      socket.emit("message", {
        text: message,
        name: userName,
        id: `${userId}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit" className="sendBtn">
          SEND
        </button>
      </form>
    </div>
  );
}

export default ChatFooter;
