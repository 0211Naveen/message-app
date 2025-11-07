// import React, { useState } from "react";
// import axios from "axios";

// const SubmitForm = () => {
//   const [formData, setFormData] = useState({ name: "", message: "" });
//   const [status, setStatus] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         console.log("API URL:", process.env.REACT_APP_API_URL);

//       await axios.post(`${process.env.REACT_APP_API_URL}/api/messages/save`, formData);
      
//       setStatus("✅ Message saved successfully!");
//       setFormData({ name: "", message: "" });
//     } catch (error) {
//       setStatus("❌ Failed to save message");
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <h2 style={{ textAlign: "center" }}>Submit Message</h2>

//     <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
//       <form onSubmit={handleSubmit}>
//         <input
//           name="name"
//           placeholder="Enter your name"
//           value={formData.name}
//           onChange={handleChange}
//           style={{ display: "block", marginBottom: "10px", padding: "8px" }}
//         />
//         <textarea
//           name="message"
//           placeholder="Enter your message"
//           value={formData.message}
//           onChange={handleChange}
//           style={{ display: "block", marginBottom: "10px", padding: "8px" }}
//         />
//         <button type="submit">Submit</button>
//       </form>
//       <p>{status}</p>
//     </div>
//     </>

//   );
// };

// export default SubmitForm;




import React, { useState } from "react";
import axios from "axios";

const SubmitForm = () => {
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("");

    try {
      console.log("API URL:", process.env.REACT_APP_API_URL);

      await axios.post(`${process.env.REACT_APP_API_URL}/api/messages/save`, formData);

      setStatus("Message saved successfully!");
      setFormData({ name: "", message: "" });
    } catch (error) {
      setStatus("Failed to save message. Try again!");
      console.error("Submit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="submit-form-container">
      <div className="form-card">
        <h2 className="form-title">Submit Your Message</h2>
        <p className="form-subtitle">We'd love to hear from you!</p>

        <form onSubmit={handleSubmit} className="message-form">
          <div className="input-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
            <label className="input-label">Name</label>
            <span className="input-focus"></span>
          </div>

          <div className="input-group">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="form-textarea"
            />
            <label className="textarea-label">Message</label>
            <span className="input-focus"></span>
          </div>

          <button type="submit" disabled={isLoading} className="submit-btn">
            {isLoading ? (
              <>
                <span className="spinner"></span> Sending...
              </>
            ) : (
              <>
                Send Message
              </>
            )}
          </button>
        </form>

        {status && (
          <div className={`status-message ${status.includes("success") ? "success" : "error"}`}>
            <span className="status-icon">
              {status.includes("success") ? "" : ""}
            </span>
            {status}
          </div>
        )}
      </div>

      {/* Advanced Inline CSS */}
      <style jsx>{`
        .submit-form-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .form-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 40px 50px;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          animation: fadeInUp 0.8s ease-out;
        }

        .form-title {
          text-align: center;
          color: #333;
          font-size: 32px;
          margin: 0 0 10px 0;
          font-weight: 700;
          background: linear-gradient(45deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .form-subtitle {
          text-align: center;
          color: #666;
          margin-bottom: 30px;
          font-size: 16px;
        }

        .message-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .input-group {
          position: relative;
        }

        .form-input,
        .form-textarea {
          width: 100%;
          padding: 16px 20px;
          border: 2px solid #e1e1e1;
          border-radius: 12px;
          font-size: 16px;
          transition: all 0.3s ease;
          background: #f8f9fa;
          resize: none;
        }

        .form-input:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        .input-label,
        .textarea-label {
          position: absolute;
          top: -10px;
          left: 16px;
          background: white;
          padding: 0 8px;
          font-size: 14px;
          color: #667eea;
          font-weight: 600;
          pointer-events: none;
          transition: all 0.3s ease;
        }

        .input-focus {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          transition: width 0.4s ease;
        }

        .form-input:focus ~ .input-focus,
        .form-textarea:focus ~ .input-focus,
        .form-input:not(:placeholder-shown) ~ .input-focus,
        .form-textarea:not(:placeholder-shown) ~ .input-focus {
          width: 100%;
        }

        .submit-btn {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 16px 32px;
          font-size: 18px;
          font-weight: 600;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
        }

        .submit-btn:active {
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: 10px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .status-message {
          margin-top: 20px;
          padding: 16px 20px;
          border-radius: 12px;
          font-weight: 600;
          text-align: center;
          animation: slideIn 0.5s ease-out;
        }

        .status-message.success {
          background: linear-gradient(45deg, #d4edda, #c3e6cb);
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .status-message.error {
          background: linear-gradient(45deg, #f8d7da, #f5c6cb);
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .status-icon {
          display: inline-block;
          margin-right: 8px;
          font-size: 18px;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .form-card {
            padding: 30px 25px;
            margin: 10px;
          }
          .form-title {
            font-size: 28px;
          }
        }
      `}</style>
    </div>
  );
};

export default SubmitForm;