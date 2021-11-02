const Event = require('../models/Event');
const express = require('express');

exports.getSpecific = (req, res) => {
    try {
        const event = Event.findOne({_id: req.params.id });
        res.send(event);
    } catch {
        res.status(404);
        res.send({error: "Event doesn't exist"});
    }
};

exports.getAll = (req, res) => {
    const events = Event.find();
    res.send(events);
};

exports.createNew = (req, res) => {
    const event = new Event({
        title: req.body.title,
        description: req.body.description,
        details: req.body.details,
        when: req.body.when,
    });
 event.save();
    res.send(event);
};

exports.updateSpecific = (req, res) => {
    try {
		const event = Event.findOne({ _id: req.params.id })

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

	 event.save()
		res.send(event)
	} catch {
		res.status(404)
		res.send({ error: "Event doesn't exist!" })
	}
};

exports.deleteSpecific = (req, res) => {
    try {
	 Event.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Event doesn't exist!" })
	}
};