
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


// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const connectDB = require("./config/db");

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());

// // ✅ Allowed frontend URLs
// const allowedOrigins = [
//   process.env.CLIENT_URL,               // localhost
//   process.env.PRODUCTION_CLIENT_URL     // deployed frontend
// ].filter(Boolean);

// // ✅ CORS middleware (Express 5 safe)
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// // ✅ Apply CORS globally (no app.options)
// app.use(cors(corsOptions));

// // ✅ Routes
// app.use("/api/messages", require("./routes/messageRoutes"));

// // ✅ Health Check route
// app.get("/", (req, res) => {
//   res.send("🚀 API is running successfully with Express 5 CORS fix!");
// });

// // ✅ Handle unknown routes (Express 5 safe)
// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// // ✅ Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
