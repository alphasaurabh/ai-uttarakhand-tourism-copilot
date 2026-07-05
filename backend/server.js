require("dotenv").config();

const express = require("express");
const cors = require("cors");

const destinationRoutes = require("./routes/destinations");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/destinations", destinationRoutes);

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