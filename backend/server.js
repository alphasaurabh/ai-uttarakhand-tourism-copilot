require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory data
const destinations = [
  {
    id: 1,
    name: "Mussoorie",
    location: "Dehradun",
  },
  {
    id: 2,
    name: "Nainital",
    location: "Nainital",
  },
];

// Home Route
app.get("/", (req, res) => {
  res.send("Welcome to Uttarakhand Tourism API 🚀");
});

// Get all destinations
app.get("/api/destinations", (req, res) => {
  res.status(200).json(destinations);
});

// Search destinations
app.get("/api/destinations/search", (req, res) => {
  const q = req.query.q;

  if (!q) {
    return res.status(400).json({
      message: "Search query is required",
    });
  }

  const filtered = destinations.filter((destination) =>
    destination.name.toLowerCase().includes(q.toLowerCase())
  );

  res.status(200).json(filtered);
});

// Get destination by ID
app.get("/api/destinations/:id", (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      message: "Invalid ID",
    });
  }

  const destination = destinations.find(
    (destination) => destination.id === id
  );

  if (!destination) {
    return res.status(404).json({
      message: "Destination not found",
    });
  }

  res.status(200).json(destination);
});

// Create destination
app.post("/api/destinations", (req, res) => {
  const { name, location } = req.body;

  if (!name || !location) {
    return res.status(400).json({
      message: "Name and location are required",
    });
  }

  const newDestination = {
    id: destinations.length
      ? destinations[destinations.length - 1].id + 1
      : 1,
    name,
    location,
  };

  destinations.push(newDestination);

  res.status(201).json(newDestination);
});

// Update destination
app.put("/api/destinations/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, location } = req.body;

  const destination = destinations.find(
    (destination) => destination.id === id
  );

  if (!destination) {
    return res.status(404).json({
      message: "Destination not found",
    });
  }

  if (name) destination.name = name;
  if (location) destination.location = location;

  res.status(200).json(destination);
});

// Delete destination
app.delete("/api/destinations/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = destinations.findIndex(
    (destination) => destination.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Destination not found",
    });
  }

  destinations.splice(index, 1);

  res.status(204).send();
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