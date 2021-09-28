const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
var redis = require('redis');
var JWTR =  require('jwt-redis').default;
//ES6 import JWTR from 'jwt-redis';
var redisClient = redis.createClient();
var jwtr = new JWTR(redisClient);


exports.register = async(req, res) => {
    try {
        const {firstName,lastName,gender,country,password,phone,email} = req.body;
        console.log( req.body);
        const userRegister = new User({firstName,lastName,gender,country,password,phone,email});
        await userRegister.save();
        res.status(201).json({message: 'Registration successful'})
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message})
    }
}

exports.login = async(req, res) => {
    try {
        const {password,email} = req.body;
        // console.log(req.body)
        if(!email || !password) {
            res.status(400).json({error: "Please fill the Credentials!"})
        }

        const userLogin = await User.findOne({email})
        console.log(userLogin)

        const isPassword = await bcrypt.compare(password, userLogin.password)
        if(!isPassword) {
        res.status(401).json({error: "Credentials do not get matched!"})
       }

        const payload = {id: userLogin._id};
        const token = await jwtr.sign(payload,process.env.SECRET_KEY,{expiresIn: process.env.TOKEN_EXPIRES} )
            
            console.log(token)
            res.status(200).json({token, auth: true, message: 'User Login successful'})
     
    }   catch (error) {
        console.log(error);
        res.status(400).json({ auth: false, message: error.message})
    }
}

exports.getSingleUser = async(req, res) => {

    const user = await User.findOne({email: req.body.email});
    res.status(200).json({user, auth: true})
}

exports.getAllUsers = async(req, res) => {
    const user = await User.find();
    res.status(200).json({user, auth: true})
}

exports.logout = async(req, res) => {

    await jwtr.destroy(req.user.jti)
    res.status(200).json({message: "user logout"})
}