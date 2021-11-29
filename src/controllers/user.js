const User = require('../models/User');
const express = require('express');

const userController = {
	all (req, res) {
        User.find({}).exclude('password')
            .exec((err, users) => res.json(users));
	},

	byId (req, res) {
		const idUser = req.params.id;
        User.find({ _id: idUser }).exclude('password')
            .exec((err, users) => res.json(users));
	},

	create (req, res) {
		const idUser = req.params.id;
		let user = req.body;
		const newUser = new User(user);

		newUser.save( (err, saved) => {
			res.json(saved);
		});
	},

	update (req, res) {
		try {
			const idUser = req.params.id;
			let user = req.body;

			User.findOne({ _id: idUser }, (err, data) => {
                if(user.name) {
                    data.name = user.name;
                } 
                if(user.email) {
                    data.email = user.email;
                }
                if(user.password) {
                    data.password = bcrypt.hashSync(user.password);
                }
                if(user.year) {
                    data.year = user.year;
                } 
                if(user.major) {
                    data.major = user.major;
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
			res.send({ error: "User doesn't exist!" });
		}
	},

	delete (req, res) {
		const idUser = req.params.id;

        Event.findOne({_id: idUser}).deleteOne( (err, removed) => res.status(204).send() )
	}
};

module.exports = userController;