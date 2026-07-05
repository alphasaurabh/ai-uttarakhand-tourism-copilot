const prisma = require("../config/db");

// Get all destinations
const getAllDestinations = async (req, res) => {
  try {
    const destinations = await prisma.destination.findMany();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search destinations
const searchDestinations = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};

// Get destination by ID
const getDestinationById = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};

// Create destination
const createDestination = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};

// Update destination
const updateDestination = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};

// Delete destination
const deleteDestination = async (req, res) => {
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
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllDestinations,
  searchDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
};