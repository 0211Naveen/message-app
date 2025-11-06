// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());
// app.use(cors());

// app.use("/api/messages", require("./routes/messageRoutes"));


// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// ✅ Allow only specific frontend URLs
const allowedOrigins = [
  process.env.CLIENT_URL,               // for localhost
  process.env.PRODUCTION_CLIENT_URL     // for deployed frontend
].filter(Boolean); // remove undefined values

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// ✅ Routes
app.use("/api/messages", require("./routes/messageRoutes"));

// ✅ Health check route (optional)
app.get("/", (req, res) => {
  res.send("🚀 API is running successfully!");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
