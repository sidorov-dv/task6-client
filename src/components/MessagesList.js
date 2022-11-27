import React from "react";
import Message from "./Message";

const MessagesList = ({ messages, name }) => {
  return (
    <>
      {messages.map((mes) => (
        <Message
          key={mes.date}
          name={name}
          getDate={mes.date}
          from={mes.from}
          title={mes.title}
          text={mes.text}
        />
      ))}
    </>
  );
};

export default MessagesList;
