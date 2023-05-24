import React from "react";

interface ChatBodyProps {
  messages: any[]; // Specify the correct type for messages array
}

function ChatBody({ messages }: ChatBodyProps) {
  return (
    <>
      <div className="message__container">
        {messages.map((message) =>
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        {/* <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} /> */}
      </div>
    </>
  );
}

export default ChatBody;
