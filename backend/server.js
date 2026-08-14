require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const destinationRoutes = require("./routes/destinations");
const aiRoutes = require("./routes/ai");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/destinations", destinationRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to Uttarakhand Tourism API 🚀");
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Internal Server Error",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});