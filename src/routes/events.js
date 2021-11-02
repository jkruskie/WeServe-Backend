const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const eventController = require('../controllers/event');
const authenticateToken = require('../middlewares/authenticateToken');

// Events 
// Get specific event
router.get("/:id", authenticateToken, eventController.byId);

// Get all events
router.get("/", authenticateToken, eventController.all);

// Create new event
router.post("/", authenticateToken, eventController.create);

// Update Event
router.patch("/:id", authenticateToken, eventController.update);

// Delete Event
router.delete("/:id", authenticateToken, eventController.delete);

// End Events
module.exports = router;