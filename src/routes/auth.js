const express = require('express');
const router = express.Router();
const User = require('../models/User');
var bcrypt = require('bcryptjs');
var redis = require('redis');
const jwt = require('jsonwebtoken');
const { GenerateNewJWT } = require('../helpers/jwt');
const authenticateToken = require('../middlewares/authenticateToken');

// Auth 

router.post("/signin", async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    },
    [
        "password",
        "is_active",
        "name",
        "_id",
        "email",
        "user_type",
        "user_role"
    ])

    if (user == null) {
        res.status(401).json({
            "message": "Can't find account."
        });
    } else if (!await bcrypt.compare(req.body.password, user.password)) {
        res.status(401).json({
            "message": "Password is not correct."
        });
    }else if (user.is_active == false) {
        res.status(401).json({
            "message": "User Is Inactive"
        });
    } else {
        deviceName = req.body.deviceName == null ? "Unknown Device" : req.body.deviceName;
        res.status(200).send({
            id: user._id,
            name: user.name,
            email: user.email,
            team: user.team,
            accessToken: await GenerateNewJWT(user._id, deviceName),
            active: user.is_active,
            user_type: user.user_type,
        });
    }
});

router.post("/signup", async (req, res) => {
    const user = await User.findOne({email: req.body.email });

    if (!user) {
 
        let user = req.body;
		const newUser = new User(user);
        newUser.password = bcrypt.hashSync(user.password);
        newUser.is_active = true;

		newUser.save( async (err, saved) => {
            if(err) {
                return res.json(err);
            } else {
                deviceName = req.body.deviceName == null ? "Unknown Device" : req.body.deviceName;
                var token = await GenerateNewJWT(newUser._id, deviceName);
        
                res.send({
                    id: saved._id,
                    name: saved.name,
                    email: saved.email,
                    team: saved.team,
                    accessToken: token,
                    active: saved.is_active,
                    user_type: saved.user_type,
                    user_role: saved.user_role
                });
            }
		});

    } else {
        // User exists already
        return res.status(403).send({ message: "User Exists Already." });
    }
});

// End Auth

function createToken(user) {
    console.log(user)
    return jwtr.sign({ id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: 2592000  // 30 days
        });
}

router.get("/whoami", authenticateToken, async (req, res) => {
    res.json(req.user);
})


module.exports = router;