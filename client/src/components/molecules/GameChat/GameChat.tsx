import React, { useEffect, useState, useRef } from "react";

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
      })

      setMessages([...messages, {
        notification: true,
        text: "you connected to chat",
      }]);

    });

    socket.on("messageResponse", async (data: any) => {
      const response = await dispatch(getUser());
      const userFromBack = response.payload;

      if (data.name === userFromBack.user_name) data.name = "You";

      console.log(data);
      setMessages((value: any) => [...value, data])
    });
  }, []);

  return (
    <div className="chat">
      {/* <ChatBar socket={socket} /> */}
      <div className="chat__main">
        <ChatBody messages={messages} />
        <ChatFooter socket={socket} messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
}

export default GameChat;
