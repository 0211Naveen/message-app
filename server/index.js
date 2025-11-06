

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

console.log("✅ Allowed Frontend URL:", process.env.PRODUCTION_CLIENT_URL);

// // ✅ Allow only specific frontend URLs
// const allowedOrigins = [
//   process.env.CLIENT_URL,               // for localhost
//   process.env.PRODUCTION_CLIENT_URL     // for deployed frontend
// ].filter(Boolean); // remove undefined values

// app.use(cors({
//   origin: allowedOrigins,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));


const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.PRODUCTION_CLIENT_URL
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("❌ Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));


// ✅ Routes
app.use("/api/messages", require("./routes/messageRoutes"));

// ✅ Health check route (optional)
app.get("/", (req, res) => {
  res.send("🚀 API is running successfully!");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
