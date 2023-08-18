// const express = require('express');

// const app = express();

// const cors = require('cors');

// require('./config/mongoose.config');

// app.use(express.json(), express.urlencoded({ extended: true }));

// app.use(cors());

// // const AllMyUserRoutes = require('./routes/users.routes');
// // AllMyUserRoutes(app);
// // const AllMyCommunityRoutes= require('./routes/CommunityPost.route')
// // AllMyCommunityRoutes(app);
// const AllCommRoute = require('./routes/CommunityPost.routes')
// AllCommRoute(app)
// app.listen(8000, () => console.log("The server is all fired up on port 8000"));


const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors({origin: 'http://localhost:3000'}))
const port = 8000;

app.use(express.json(),express.urlencoded({extended:true}))
require('./config/mongoose.config');
const AllCommRoute = require('./routes/CommunityPost.routes')
 AllCommRoute(app)
app.listen(port, ()=> console.log(`Example app listening at http://localhost:${port}`))