import React, { useEffect, useState, useRef } from "react";

// import ChatBar from "../ChatBar/ChatBar";
import ChatBody from "../ChatBody/ChatBody";
import ChatFooter from "../ChatFooter/ChatFooter";

function GameChat({ socket }: any) {
  const [messages, setMessages]: any = useState([]);

  useEffect(() => {
    socket.on("messageResponse", (data: any) =>
      setMessages((prevMessages: any) => [...prevMessages, data])
    );
  }, [socket, messages]);

  return (
    <div className="chat">
      {/* <ChatBar socket={socket} /> */}
      <div className="chat__main">
        <ChatBody messages={messages} />
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
}

export default GameChat;
