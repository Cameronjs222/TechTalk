const PostController = require('../controllers/post.controller');

    module.exports = (app) => {
            
            app.get('/api/post', PostController.findAllPosts);
    
            app.post('/api/post/create', PostController.createNewPost);
    
            app.get('/api/post/:id', PostController.findOneSinglePost);
    
            app.patch('/api/post/:id', PostController.updateExistingPost);
    
            app.delete('/api/post/:id', PostController.deleteAnExistingPost);
    
        }