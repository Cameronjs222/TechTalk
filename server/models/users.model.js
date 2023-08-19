const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required: [true, "Email is required"],
        unique:true
    },
    password:{
        type:String,
        required: [true, "Password is required"],
    },
    confirmPass:{
        type:String,
        required: [true, "Confirm Password is required"],
    },
    name:{
        type:String,
        required: [true, "Full Name is required"],
        minlength: [2, "Full Name must at least be 2 characters long"]
    },
    followers:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User'
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }],
},{
    timestamps:true
});

userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (error){
            return next(error);
        }
    }
    next();
});

module.exports = mongoose.model('User', userSchema);