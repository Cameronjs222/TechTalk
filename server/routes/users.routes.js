const UsersController = require('../controllers/users.controller');

module.exports = (app) => {

    app.get('/api/users', UsersController.findAllUsers);

    app.post('/api/users', UsersController.createNewUser);

    app.get('/api/users/:id', UsersController.findOneSingleUser);

    app.get('/api/users/:email', UsersController.findUserByEmail);

    app.patch('/api/users/:id', UsersController.updateExistingUser);

    app.delete('/api/users/:id', UsersController.deleteAnExistingUser);

};

//this is a git push test comment