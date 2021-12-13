var redis = require('redis');
var JWTR =  require('jwt-redis').default;
var redisConfig = require('../config/redis')
var redisClient = redis.createClient(redisConfig);
var jwtr = new JWTR(redisClient);

async function GenerateNewJWT(userId, deviceName) {
    return await jwtr.sign(
        { 
            id: userId, 
            device: deviceName 
        }, 
        process.env.TOKEN_SECRET, 
        {
            expiresIn: 2592000  // 30 days
        }
    );
}

module.exports = {GenerateNewJWT}