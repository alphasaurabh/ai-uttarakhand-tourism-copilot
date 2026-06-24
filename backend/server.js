const express = require("express");
const cors = require("cors");
const app = express();

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
  res.json(destinations);
});

// Search destinations
app.get("/api/destinations/search", (req, res) => {
  const q = req.query.q;

  if (!q) {
    return res.status(400).json({
      message: "Search query is required",
    });
  }

  const filtered = destinations.filter((d) =>
    d.name.toLowerCase().includes(q.toLowerCase())
  );

  res.json(filtered);
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
    (d) => d.id === id
  );

  if (!destination) {
    return res.status(404).json({
      message: "Destination not found",
    });
  }

  res.json(destination);
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
    (d) => d.id === id
  );

  if (!destination) {
    return res.status(404).json({
      message: "Destination not found",
    });
  }

  destination.name = name || destination.name;
  destination.location = location || destination.location;

  res.json(destination);
});

// Delete destination
app.delete("/api/destinations/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = destinations.findIndex(
    (d) => d.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Destination not found",
    });
  }

  destinations.splice(index, 1);

  res.status(204).send();
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});