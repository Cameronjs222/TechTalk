const CommunityPostController = require('../controllers/CommunityController')
module.exports = app =>{
    app.post('/api/create',CommunityPostController.createComPost)
     app.patch('/api/update/:id', CommunityPostController.updateComPost )
}
