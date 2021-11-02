const express = require('express');
const router = express.Router();
const User = require('../models/User');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Auth 

// Get specific user
router.post("/signin", async (req, res) => {
    const user = await User.findOne({email: req.body.email });

    if(user) { 
        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        
        if(!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
                });
        }
    
        var token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: 2592000  // 30 days
            });
    
            res.status(200).send({
            id: user._id,
            name: user.name,
            email: user.email,
            year: user.year,
            major: user.major,
            accessToken: token
            });
    } else {
        return res.status(404).send({ message: "User Not found." });
    }
});


// End Auth



module.exports = router;