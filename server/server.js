const express = require('express');

const app = express();

const cors = require('cors');

require('./config/mongoose.config');

app.use(express.json(), express.urlencoded({ extended: true }));

app.use(cors());

const AllMyUserRoutes = require('./routes/users.routes');
const AllMyPostRoutes = require('./routes/post.routes');

AllMyPostRoutes(app);
AllMyUserRoutes(app);

app.listen(8000, () => console.log("The server is all fired up on port 8000"));