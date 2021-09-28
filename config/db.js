const mongoose = require('mongoose')
require('dotenv').config()
require('colors');

const MONGOURI = process.env.MONGOURI

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(MONGOURI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connected to mongodb server !".america)
    } catch (error) {
        console.log(error)
        throw error
    }
}

module.exports = InitiateMongoServer;