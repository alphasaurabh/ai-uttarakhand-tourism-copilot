const express = require("express");

const {
  getAllDestinations,
  searchDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
} = require("../controllers/destinationController");

const router = express.Router();

router.get("/", getAllDestinations);
router.get("/search", searchDestinations);
router.get("/:id", getDestinationById);
router.post("/", createDestination);
router.put("/:id", updateDestination);
router.delete("/:id", deleteDestination);

module.exports = router;