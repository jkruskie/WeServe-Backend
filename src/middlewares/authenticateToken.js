var redis = require('redis');
var JWTR = require('jwt-redis').default;
var redisConfig = require('../config/redis')
var redisClient = redis.createClient(redisConfig);
var jwtr = new JWTR(redisClient);
var User = require('../models/User');

async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    try {
        let userData = await jwtr.verify(token, process.env.TOKEN_SECRET);

        if (userData) {
            User.findOne({_id: userData.id}, function(err, user) {
                if (err) {
                    return res.sendStatus(403);
                }
                if (user) {
                    req.user = user;
                    next()
                }
            });
        } else {
            return res.sendStatus(403);
        }

    } catch (error) {
        // If token doesn't exist or is destroyed,
        // a TokenDestroyedError is generated.
        // Encapsulated the verify function in a try catch
        // to catch this error.
        // jtk 12/12/21
        // console.log(error);
        res.sendStatus(403);
    }

}

module.exports = authenticateToken;