const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organization');
const authenticateToken = require('../middlewares/authenticateToken');

// Organizations 

// Get specific organization
router.get("/:id", authenticateToken, organizationController.byId);

// Get all organizations
router.get("/", authenticateToken, organizationController.all);

// Create new organization
router.post("/", authenticateToken, organizationController.create);

// Update organization
router.patch("/:id", authenticateToken, organizationController.update);

// Delete organization
router.delete("/:id", authenticateToken, organizationController.delete);

// End Organizations



module.exports = router;