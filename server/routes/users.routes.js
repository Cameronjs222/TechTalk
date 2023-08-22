const UsersController = require('../controllers/users.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {

    app.get('/api/users', authenticate, UsersController.findAllUsers);

    app.post('/api/users/register', UsersController.register);
    app.post('/api/users/login', UsersController.login);
    app.post('/api/users/logout', UsersController.logout);

    app.get('/api/users/me', UsersController.findOneSingleUser);

    // app.get('/api/users/:email', UsersController.findUserByEmail);

    app.patch('/api/users/updateMe', UsersController.updateExistingUser);

    app.delete('/api/users/:id', UsersController.deleteAnExistingUser);

};

//this is a git push test comment