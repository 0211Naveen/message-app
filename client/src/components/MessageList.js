import React, { useEffect, useState } from "react";
import axios from "axios";

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/messages");
        setMessages(res.data);
      } catch (err) {
        console.error("❌ Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>All Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul>
          {messages.map((msg) => (
            <li key={msg._id} style={{ marginBottom: "10px" }}>
              <b>{msg.name}</b>: {msg.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessageList;
