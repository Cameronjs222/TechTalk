const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Title is required"],
        minLength:[2, "Title must be at least 2 characters long"],
    },
    content:{
        type:String,
        required:[true, "Post content is required"],
        minLength:[4,"Content must be at least 4 characters long"],
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
} , { timestamps:true });

module.exports = mongoose.model('Post', postSchema);