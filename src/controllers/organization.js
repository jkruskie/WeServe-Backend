const Organization = require('../models/Organization');
const express = require('express');

const organizationController = {
	all (req, res) {
        Organization.find({})
            .exec((err, org) => res.json(org));
	},

	byId (req, res) {
		const idOrg = req.params.id;
        Organization.find({ _id: idOrg })
            .exec((err, org) => res.json(org));
	},

	create (req, res) {
		const idOrg = req.params.id;
		let org = req.body;
		const newOrg = new Organization(org);

		newOrg.save( (err, saved) => {
			res.json(saved);
		});
	},

	update (req, res) {
		try {
			const idOrg = req.params.id;
			let org = req.body;

			Organization.findOne({ _id: idOrg }, (err, data) => {
                if(org.name) {
                    data.name = org.name;
                } 
                if(org.description) {
                    data.description = org.description;
                }
                if(org.image) {
                    data.image = org.image;
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
			res.send({ error: "Organization doesn't exist!" });
		}
	},

	delete (req, res) {
		const idOrg = req.params.id;

        Organization.findOne({_id: idOrg}).deleteOne( (err, removed) => res.status(204).send() )
	}
};

module.exports = organizationController;