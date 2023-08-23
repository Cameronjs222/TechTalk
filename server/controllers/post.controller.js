const post = require('../models/posts.model');

<<<<<<< HEAD
module.exports.findAllPosts = (req, res) => {
    post.find()
        .then((allPosts) => res.json({posts: allPosts}))
        .catch(err => res.json({message: "Something went wrong", error: err}));
}

module.exports.createNewPost = (req, res) => {
    // console.log(req.body)
    post.create(req.body)
    .then(newlyCreatedPost => res.json({post: newlyCreatedPost}))
        .catch(err => res.status(400).json({message: "Something went wrong", error: err}));
    }

module.exports.findOneSinglePost = (req, res) => {
    post.findOne({_id: req.params.id})
        .then(oneSinglePost => res.json({post: oneSinglePost}))
        .catch(err => res.status(400).json({message: "Something went wrong", error: err}));
}
=======
module.exports = {

    findAllPosts: (req, res) => {
        post.find()
            .then((allPosts) => res.json({ posts: allPosts }))
            .catch(err => res.json({ message: "Something went wrong", error: err }));
    },

>>>>>>> main

    createNewPost: async (req, res) => {
        console.log("Received a request to create a new post");
        console.log("Request body:", req.body);
    
        try {
            const newlyCreatedPost = await post.create(req.body);
            console.log("New post created:", newlyCreatedPost);
            res.json({ post: newlyCreatedPost });
        } catch (err) {
            console.error("Error creating post:", err);
            res.status(500).json({ message: "Something went wrong", error: err });
        }
    }
    ,


    findOneSinglePost: (req, res) => {
        post.findOne({ _id: req.params.id })
            .then(oneSinglePost => res.json({ post: oneSinglePost }))
            .catch(err => res.json({ message: "Something went wrong", error: err }));
    },

<<<<<<< HEAD
    .then(updatedPost => res.json({post: updatedPost}))
    .catch(err => res.status(400).json({message: "Something went wrong", error: err}));
}
=======
>>>>>>> main

    updateExistingPost: async (req, res) => {
        await post.findOneAndUpdate(
            { _id: req.params.id },

            req.body,

            { new: true, runValidators: true }
        )

            .then(updatedPost => res.json({ post: updatedPost }))
            .catch(err => res.json({ message: "Something went wrong", error: err }));
    },

    deleteAnExistingPost:  (req, res) => {
        post.deleteOne({ _id: req.params.id })
            .then(result => res.json({ result: result }))
            .catch(err => res.json({ message: "Something went wrong", error: err }));
    }

}