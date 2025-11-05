import React, { useState } from "react";
import axios from "axios";

const SubmitForm = () => {
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/messages", formData);
      setStatus("✅ Message saved successfully!");
      setFormData({ name: "", message: "" });
    } catch (error) {
      setStatus("❌ Failed to save message");
      console.error(error);
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Submit Message</h2>

    <div style={{ padding: "30px", display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          style={{ display: "block", marginBottom: "10px", padding: "8px" }}
        />
        <textarea
          name="message"
          placeholder="Enter your message"
          value={formData.message}
          onChange={handleChange}
          style={{ display: "block", marginBottom: "10px", padding: "8px" }}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{status}</p>
    </div>
    </>

  );
};

export default SubmitForm;
