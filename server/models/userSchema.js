const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    phone:{
        type: Number,
        require: true
    },
    work:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    cpassword:{
        type: String,
        require: true
    }
})


userSchema.pre('save', async function (next) {
    console.log("Inside Pre of userSchema");
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

const User = new mongoose.model('users', userSchema);
module.exports = User;