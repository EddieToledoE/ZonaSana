"use client";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "@/styles/Chat.css";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:3001");

    socketRef.current.on("chat message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socketRef.current.emit("chat message", message);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <ul className="message-list">
        {messages.map((message, index) => (
          <li key={index} className="message-item">
            {message}
          </li>
        ))}
      </ul>
      <form onSubmit={sendMessage} className="chat-form">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje"
        />
        <button>Enviar</button>
      </form>
    </div>
  );
}

export default Chat;
