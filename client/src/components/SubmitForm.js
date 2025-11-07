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
      await axios.post(`${process.env.REACT_APP_API_URL}/api/messages/save`, formData);
      setStatus("Message sent successfully!");
      setFormData({ name: "", message: "" });
    } catch (error) {
    setStatus("Failed to send message");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="submit-page">
      <div className="form-popup">
        <h2>Submit Your Message</h2>
        <p>We'd love to hear from you!</p>

        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder=" "
            />
            <label>Name</label>
          </div>

          <div className="input-wrapper">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              placeholder=" "
            />
            <label>Message</label>
          </div>

          <button type="submit" disabled={isLoading} className="send-btn">
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status && (
          <p className={`status ${status.includes("success") ? "success" : "error"}`}>
            {status}
          </p>
        )}
      </div>

      {/* EXACT MOBILE + DESKTOP DESIGN */}
      <style jsx>{`
        .submit-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          font-family: 'Segoe UI', sans-serif;
        }

        .form-popup {
          background: white;
          border-radius: 28px;
          padding: 40px 32px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          position: relative;
          animation: floatIn 0.8s ease-out;
        }

        .form-popup h2 {
          text-align: center;
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 8px 0;
        }

        .form-popup p {
          text-align: center;
          color: #666;
          font-size: 16px;
          margin: 0 0 32px 0;
        }

        .input-wrapper {
          position: relative;
          margin-bottom: 24px;
        }

        .input-wrapper input,
        .input-wrapper textarea {
          width: 100%;
          padding: 16px 20px;
          border: 2px solid #e0e0e0;
          border-radius: 16px;
          font-size: 16px;
          background: #f8f9fa;
          transition: all 0.3s ease;
        }

        .input-wrapper input:focus,
        .input-wrapper textarea:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.15);
        }

        .input-wrapper label {
          position: absolute;
          top: 16px;
          left: 20px;
          color: #999;
          font-size: 16px;
          pointer-events: none;
          transition: all 0.3s ease;
          background: white;
          padding: 0 8px;
        }

        .input-wrapper input:focus ~ label,
        .input-wrapper textarea:focus ~ label,
        .input-wrapper input:not(:placeholder-shown) ~ label,
        .input-wrapper textarea:not(:placeholder-shown) ~ label {
          top: -10px;
          left: 16px;
          font-size: 13px;
          color: #667eea;
          font-weight: 600;
        }

        .send-btn {
          width: 100%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          border: none;
          padding: 18px;
          border-radius: 50px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
        }

        .send-btn:hover:not(:disabled) {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
        }

        .send-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .status {
          margin-top: 20px;
          text-align: center;
          padding: 12px;
          border-radius: 12px;
          font-weight: 600;
        }

        .status.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .status.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        @keyframes floatIn {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Mobile Perfect Match */
        @media (max-width: 480px) {
          .submit-page {
            padding: 15px;
            align-items: flex-start;
            padding-top: 10vh;
          }

          .form-popup {
            border-radius: 24px;
            padding: 32px 24px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          }

          .form-popup h2 {
            font-size: 26px;
          }

          .input-wrapper input,
          .input-wrapper textarea {
            padding: 14px 18px;
            border-radius: 14px;
          }

          .send-btn {
            padding: 16px;
            font-size: 17px;
          }
        }
      `}</style>
    </div>
  );
};

export default SubmitForm;