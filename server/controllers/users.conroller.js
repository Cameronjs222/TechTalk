const {model} = require('mongoose');
const Users = model('../models/users.model');

model.exports.findAllUsers = (req, res) => {
    Users.find()
    .then((allUsers) => res.json({users: allUsers}))
    .catch(err => res.json({message: "Something went wrong", error: err}));
}

model.exports.findOneSingleUser = (req, res) => {
    Users.findOne({_id: req.params.id})
    .then(oneSingleUser => res.json({user: oneSingleUser}))
    .catch(err => res.json({message: "Something went wrong", error: err}));
}

model.exports.createNewUser = (req, res) => {
    Users.create(req.body)
    .then(newlyCreatedUser => res.json({user: newlyCreatedUser}))
    .catch(err => res.json({message: "Something went wrong", error: err}));
}

model.exports.updateExistingUser = (req, res) => {
    Users.findOneAndUpdate(
        {_id: req.params.id},

        req.body,

        {new: true, runValidators: true}
    )

    .then(updatedUser => res.json({user: updatedUser}))
    .catch(err => res.json({message: "Something went wrong", error: err}));
}

model.exports.deleteAnExistingUser = (req, res) => {
    Users.deleteOne({_id: req.params.id})
    .then(result => res.json({result: result}))
    .catch(err => res.json({message: "Something went wrong", error: err}));
}

model.exports.findUserByEmail = (req, res) => {
    Users.findOne({email: req.params.email})
    .then(user => res.json({user: user}))
    .catch(err => res.json({message: "Something went wrong", error: err}));
}