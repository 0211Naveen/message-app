// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const MessageList = () => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/messages`);
//         setMessages(res.data);
//       } catch (err) {
//         console.error("❌ Error fetching messages:", err);
//       }
//     };
//     fetchMessages();
//   }, []);

//   return (
//     <div style={{ padding: "30px" }}>
//       <h2>All Messages</h2>
//       {messages.length === 0 ? (
//         <p>No messages yet.</p>
//       ) : (
//         <ul>
//           {messages.map((msg) => (
//             <li key={msg._id} style={{ marginBottom: "10px" }}>
//               <b>{msg.name}</b>: {msg.message}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default MessageList;


import React, { useEffect, useState } from "react";
import axios from "axios";

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/messages`);
        setMessages(res.data);
      } catch (err) {
        setError("Failed to load messages. Please try again later.");
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="messages-container">
      <div className="messages-card">
        <div className="header">
          <h1 className="title">All Messages</h1>
          <p className="subtitle">Total: {messages.length} message{messages.length !== 1 ? "s" : ""}</p>
        </div>

        {loading && (
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Loading messages...</p>
          </div>
        )}

        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}

        {!loading && !error && messages.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon"></div>
            <h3>No messages yet</h3>
            <p>Be the first one to send a message!</p>
          </div>
        )}

        {!loading && !error && messages.length > 0 && (
          <div className="messages-grid">
            {messages.map((msg, index) => (
              <div
                key={msg._id}
                className="message-card"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="message-header">
                  <div className="avatar">
                    {msg.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-info">
                    <h4 className="username">{msg.name}</h4>
                    <span className="timestamp">
                      {new Date(msg.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                <p className="message-text">{msg.message}</p>
                <div className="message-footer">
                  <span className="message-index">#{messages.length - index}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Premium Inline CSS */}
      <style jsx>{`
        .messages-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          padding: 40px 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .messages-card {
          max-width: 900px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 40px 30px;
          text-align: center;
        }

        .title {
          font-size: 36px;
          font-weight: 800;
          margin: 0;
          text-shadow: 0 4px 10px rgba(0,0,0,0.3);
        }

        .subtitle {
          margin: 10px 0 0;
          opacity: 0.9;
          font-size: 18px;
          font-weight: 500;
        }

        .loading-state {
          text-align: center;
          padding: 60px 20px;
          color: #666;
        }

        .spinner-large {
          width: 50px;
          height: 50px;
          border: 5px solid #f3f3f3;
          border-top: 5px solid #667eea;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 20px;
        }

        .error-banner {
          background: linear-gradient(45deg, #ff6b6b, #ee5a52);
          color: white;
          padding: 20px;
          text-align: center;
          font-weight: 600;
          font-size: 18px;
        }

        .empty-state {
          text-align: center;
          padding: 80px 40px;
          color: #888;
        }

        .empty-icon {
          width: 80px;
          height: 80px;
          background: #eee;
          border-radius: 50%;
          margin: 0 auto 20px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ccc'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'/%3E%3C/svg%3E");
          background-size: 40px;
          background-repeat: no-repeat;
          background-position: center;
        }

        .empty-state h3 {
          font-size: 24px;
          margin: 20px 0 10px;
          color: #555;
        }

        .messages-grid {
          padding: 30px;
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }

        .message-card {
          background: white;
          border-radius: 18px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid #e0e0e0;
          transition: all 0.3s ease;
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }

        .message-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
          border-color: #667eea;
        }

        .message-header {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }

        .avatar {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 20px;
          margin-right: 14px;
          box-shadow: 0 4px 10px rgba(102, 126, 234, 0.3);
        }

        .user-info {
          flex: 1;
        }

        .username {
          margin: 0;
          font-size: 18px;
          font-weight: 700;
          color: #333;
        }

        .timestamp {
          font-size: 13px;
          color: #888;
          font-weight: 500;
        }

        .message-text {
          font-size: 16px;
          line-height: 1.6;
          color: #444;
          margin: 0 0 16px 0;
          word-wrap: break-word;
        }

        .message-footer {
          text-align: right;
        }

        .message-index {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 700;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .messages-grid {
            grid-template-columns: 1fr;
            padding: 20px;
          }
          .header {
            padding: 30px 20px;
          }
          .title {
            font-size: 28px;
          }
        }

        @media (max-width: 480px) {
          .messages-card {
            margin: 10px;
            border-radius: 16px;
          }
          .message-card {
            padding: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default MessageList;