const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required: [true, "Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPass:{
        type:String,
        required: true
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

module.exports = mongoose.model('User', userSchema);