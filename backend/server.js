require("dotenv").config();
const prisma = require("./config/db");
const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to Uttarakhand Tourism API 🚀");
});

// Get all destinations
app.get("/api/destinations", async (req, res) => {
  try {
    const destinations = await prisma.destination.findMany();

    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Search destinations
app.get("/api/destinations/search", async (req, res) => {
  try {
    const q = req.query.q;

    if (!q) {
      return res.status(400).json({
        message: "Search query is required",
      });
    }

    const destinations = await prisma.destination.findMany({
      where: {
        name: {
          contains: q,
          mode: "insensitive",
        },
      },
    });

    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get destination by ID
app.get("/api/destinations/:id", async (req, res) => {
  try {
    const destination = await prisma.destination.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!destination) {
      return res.status(404).json({
        message: "Destination not found",
      });
    }

    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Create destination
app.post("/api/destinations", async (req, res) => {
  try {
    const { name, location, description, imageUrl } = req.body;

    const destination = await prisma.destination.create({
      data: {
        name,
        location,
        description,
        imageUrl,
      },
    });

    res.status(201).json(destination);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update destination
app.put("/api/destinations/:id", async (req, res) => {
  try {
    const { name, location, description, imageUrl } = req.body;

    const destination = await prisma.destination.update({
      where: {
        id: req.params.id,
      },
      data: {
        name,
        location,
        description,
        imageUrl,
      },
    });

    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete destination
app.delete("/api/destinations/:id", async (req, res) => {
  try {
    await prisma.destination.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      message: "Destination deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
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