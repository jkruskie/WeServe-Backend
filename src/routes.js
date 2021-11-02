const express = require('express');
const router = express.Router();
const Event = require('./models/Event');

// Events 

// Get specific event
router.get("/events/:id", async (req, res) => {
    try {
        const event = await Event.findOne({_id: req.params.id });
        res.send(event);
    } catch {
        res.status(404);
        res.send({error: "Event doesn't exist"});
    }
});

// Get all events
router.get("/events", async (req, res) => {
    const events = await Event.find();
    res.send(events);
});

// Create new event
router.post("/events", async (req, res) => {
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
router.patch("/events/:id", async (req, res) => {
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

// End Events



module.exports = router;