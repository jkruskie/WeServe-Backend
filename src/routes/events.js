const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const authenticateToken = require('../middlewares/authenticateToken');
// Events 
// Get specific event
router.get("/:id", authenticateToken, async (req, res) => {
    try {
        const event = await Event.findOne({_id: req.params.id });
        res.send(event);
    } catch {
        res.status(404);
        res.send({error: "Event doesn't exist"});
    }
});

// Get all events
router.get("/", authenticateToken, async (req, res) => {
    const events = await Event.find();
    res.send(events);
});

// Create new event
router.post("/", authenticateToken, async (req, res) => {
    const event = new Event({
        title: req.body.title,
        description: req.body.description,
        details: req.body.details,
        when: req.body.when,
    });
    await event.save();
    res.send(event);
});

// Update Event
router.patch("/:id", authenticateToken, async (req, res) => {
	try {
		const event = await Event.findOne({ _id: req.params.id })

		if (req.body.title) {
			event.title = req.body.title
		}

		if (req.body.description) {
			event.description = req.body.description
		}

        if (req.body.details) {
			event.details = req.body.details
		}


        if (req.body.when) {
			event.when = req.body.when
		}

		await event.save()
		res.send(event)
	} catch {
		res.status(404)
		res.send({ error: "Event doesn't exist!" })
	}
})

// Delete Event
router.delete("/:id", authenticateToken, async (req, res) => {
	try {
		await Event.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Event doesn't exist!" })
	}
})

// End Events
module.exports = router;