const express = require('express');
const router = express.Router();
const User = require('../models/User');
var bcrypt = require("bcryptjs")
// Users 

// Get specific user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id });
        res.send(user);
    } catch {
        res.status(404);
        res.send({error: "User doesn't exist"});
    }
});

// Get all users
router.get("/", async (req, res) => {
    const users = await User.find();
    res.send(users);
});

// Create new user
router.post("/", async (req, res) => {
    const user = new User({
        name: req.body.name,  
        email: req.body.email, 
        password: bcrypt.hashSync(req.body.password), 
        year: req.body.year,  
        major: req.body.major, 
    });
    await user.save();
    res.send(user);
});

// Update User
router.patch("/:id", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id })

		// if (req.body.title) {
		// 	event.title = req.body.title
		// }

		// if (req.body.description) {
		// 	event.description = req.body.description
		// }

        // if (req.body.details) {
		// 	event.details = req.body.details
		// }


        // if (req.body.when) {
		// 	event.when = req.body.when
		// }

		await user.save()
		res.send(user)
	} catch {
		res.status(404)
		res.send({ error: "User doesn't exist!" })
	}
})

// Delete User
router.delete("/:id", async (req, res) => {
	try {
		await User.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "User doesn't exist!" })
	}
})

// End Users



module.exports = router;