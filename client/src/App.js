import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SubmitForm from "./components/SubmitForm";
import MessageList from "./components/MessageList";

const App = () => {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <nav style={{ marginBottom: "20px"}}>
          <Link to="/" style={{ marginRight: "15px" }}>Submit Message</Link>
          <Link to="/messages">View Messages</Link>
        </nav>

        <Routes>
          <Route path="/" element={<SubmitForm />} />
          <Route path="/messages" element={<MessageList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
