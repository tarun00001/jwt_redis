const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum : ['male','female','other']
    },
    country: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        minlength: 10,
        maxlength: 10,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
},{timestamps: true })

UserSchema.pre('save',async function(next){
    if(this.isModified('password')){
        // console.log("this",this)
         this.password = await bcrypt.hash(this.password,12)
    }
    next();
})

module.exports = mongoose.model("User", UserSchema);