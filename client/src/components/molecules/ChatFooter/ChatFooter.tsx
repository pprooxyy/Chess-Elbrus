import React, { useState } from "react";

import { useAppDispatch } from "../../../redux/typesRedux";
import { getUser } from "../../../redux/thunk/auth/getUser";

function ChatFooter({ socket, messages, setMessages }: any) {
  const [message, setMessage] = useState("");

  const dispatch = useAppDispatch();

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (!message.trim()) return;

    const response = await dispatch(getUser());
    const userFromBack = response.payload;

    socket.emit("message", {
      text: message,
      name: userFromBack.user_name,
      id: `${userFromBack.id}`,
      socketID: socket.id,
    });
    setMessages((value: any) => [...value, {
        text: message,
        name: "You",
        id: `${userFromBack.id}`,
        socketID: socket.id,
      }]);
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
