const Event = require('../models/Event');
const express = require('express');

const eventController = {
	all (req, res) {
        Event.find({})
            .exec((err, events) => res.json(events));
	},

	byId (req, res) {
		const idEvent = req.params.id;
        Event.find({ _id: idEvent })
            .exec((err, events) => res.json(events));
	},

	create (req, res) {
		const idEvent = req.params.id;
		let event = req.body;
		const newEvent = new Event(event);

		newEvent.save( (err, saved) => {
			res.json(saved);
		});
	},

	update (req, res) {
		try {
			const idEvent = req.params.id;
			let event = req.body;

			Event.findOne({ _id: idEvent }, (err, data) => {
				if(event.title) {
					data.title = event.title;
				}
				if(event.description) {
					data.description = event.description;
				}
				if(event.details) {
					data.details = event.details;
				}
				if(event.when) {
					data.when = event.when;
				}
                if(data) {
                    data.save((err, updated) => res.json(updated));
                } else {
                    res.status(418);
                    res.send({ error: "I'm a teapot" });
                }
			});
		} catch {
			res.status(404);
			res.send({ error: "Event doesn't exist!" });
		}
	},

	delete (req, res) {
		const idEvent = req.params.id;

        Event.findOne({_id: idEvent}).deleteOne( (err, removed) => res.status(204).send() )
	}
};

module.exports = eventController;