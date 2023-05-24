import React from "react";
import "./ChatBody.css";
interface ChatBodyProps {
  messages: any[]; // Specify the correct type for messages array
}

function ChatBody({ messages }: ChatBodyProps) {
  return (
    <div className="chat-body">
      <div className="message__container">
        {messages.map((message) => {
          if (message.notification) {
            return (
              <div className="message__chats" key={Math.random()}>
                <div className="message__notification">
                  <p>{message.text}</p>
                </div>
              </div>
            );
          } else if (message.name === "You") {
            return (
              <div className="message__chats" key={Math.random()}>
                <p className="sender__name">You</p>
                <div className="message__sender">
                  <p>{message.text}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div className="message__chats" key={Math.random()}>
                <p>{message.name}</p>
                <div className="message__recipient">
                  <p>{message.text}</p>
                </div>
              </div>
            );
          }
        })}

        {/* <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} /> */}
      </div>
    </div>
  );
}

export default ChatBody;
