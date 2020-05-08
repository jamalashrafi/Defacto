const express = require('express');
const morgan = require('morgan');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
require('dotenv').config();

//DB setup
const uri = process.env.MONGO_URL;
mongoose.connect(uri,{ useNewUrlParser : true, useCreateIndex : true });

//App setup
app.use(morgan('combined'));//Used for logging and it is middleware
app.use(bodyParser.json());//It is middleware
//router(app);
app.use(bodyParser.urlencoded({
    extended: false
    }));
app.use(cors());
app.use(methodOverride('_method'));
router(app);

//server setup
const port = process.env.PORT || 41111;
const server = http.createServer(app);
server.listen(port);

console.log(`Server is listening on port :`, port );