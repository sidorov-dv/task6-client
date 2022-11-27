import React, { useState } from "react";
import "./Message.css";

const Message = ({ name, from, getDate, title, text }) => {
  const [showText, setShowText] = useState(false);

  return (
    <div
      className="card text-bg-secondary col-8 mb-3 anim"
      style={{ cursor: "pointer" }}
      onClick={() => setShowText((prev) => !prev)}
    >
      <div className="card-header">
        Recipient: {name} From: {from}. Date:{" "}
        {new Date(getDate).toLocaleString()}
      </div>
      {showText && (
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
        </div>
      )}
    </div>
  );
};

export default Message;
