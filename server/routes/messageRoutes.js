const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// POST - Save message
router.post("/save", async (req, res) => {
  try {
    const { name, message } = req.body;
    const newMsg = new Message({ name, message });
    await newMsg.save();
    res.status(201).json({ success: true, message: "Message saved!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET - Fetch all messages (optional)
router.get("/", async (req, res) => {
  const messages = await Message.find().sort({ createdAt: -1 });
  res.json(messages);
});

module.exports = router;
