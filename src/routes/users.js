const express = require('express');
const router = express.Router();
const User = require('../models/User');
var bcrypt = require("bcryptjs");
const userController = require('../controllers/user');
const authenticateToken = require('../middlewares/authenticateToken');

// Users 

// Get specific user
router.get("/:id", authenticateToken, userController.byId);

// Get all users
router.get("/", authenticateToken, userController.all);

// Create new user
router.post("/", authenticateToken, userController.create);

// Update User
router.patch("/:id", authenticateToken, userController.update);

// Delete User
router.delete("/:id", authenticateToken, userController.delete);

// End Users



module.exports = router;