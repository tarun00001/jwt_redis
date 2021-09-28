const jwt = require("jsonwebtoken");
var redis = require('redis');
var JWTR =  require('jwt-redis').default;
//ES6 import JWTR from 'jwt-redis';
var redisClient = redis.createClient();
var jwtr = new JWTR(redisClient);

const auth = async (req, res, next) => {
    if(!req.header("Authorization")){
        return res.status(401).json({message: "Invalid authorization"})
    }
    const token = req.header("Authorization").split(" ")[1]
    if(!token){
        return res.status(401).json({message: "Invalid authorization"})
    }
    try {
        const decoded = await jwtr.verify(token, process.env.SECRET_KEY)
        // console.log("decoded",decoded)
        req.user = decoded;
        console.log("req.user ",req.user )
        console.log(req.user.jti)
        
        next();
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Invalid Token"});
    }
}

module.exports = auth;