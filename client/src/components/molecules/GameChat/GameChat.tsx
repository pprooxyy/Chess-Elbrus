import React, { useEffect, useState, useRef } from "react";
import "./GameChat.css";
// import ChatBar from "../ChatBar/ChatBar";
import ChatBody from "../ChatBody/ChatBody";
import ChatFooter from "../ChatFooter/ChatFooter";

import { useAppDispatch } from "../../../redux/typesRedux";
import { getUser } from "../../../redux/thunk/auth/getUser";

function GameChat({ socket }: any) {
  const [messages, setMessages] = useState<any>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    socket.on("connect", async () => {
      const response = await dispatch(getUser());
      const userFromBack = response.payload;

      socket.emit("newUser", {
        name: userFromBack.user_name,
        id: `${userFromBack.id}`,
        socketID: socket.id,
      });

      setMessages([
        ...messages,
        {
          notification: true,
          text: "you connected to chat",
        },
      ]);
    });

    socket.on("messageResponse", async (data: any) => {
      const response = await dispatch(getUser());
      const userFromBack = response.payload;

      console.log(data.name)
      console.log(userFromBack.user_name)
      if (data.name === userFromBack.user_name) data.name = "You";

      console.log(data);
      setMessages((value: any) => [...value, data]);
    });
  }, []);

  return (
    <div className="chat">
      <h2>Chat:</h2>
      {/* <ChatBar socket={socket} /> */}
      <div className="chat__main">
        <ChatBody messages={messages} />
        <ChatFooter
          socket={socket}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </div>
  );
}

export default GameChat;
