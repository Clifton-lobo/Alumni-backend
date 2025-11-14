const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes/authRoutes");
const AdminEventRoutes = require("./routes/adminRoutes/AdminEventRoutes");

dotenv.config(); // <-- 👈 important if your .env is inside backend folder


const app = express();

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://useralumni:passalumni@clusteralumni.sek1p83.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAlumni"
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.0.107:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin/events", AdminEventRoutes);

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
