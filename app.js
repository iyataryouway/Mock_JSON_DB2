const express = require('express');
const ejs = require('ejs');
const userRoute = require('./routes/users.js');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

//app object is a new instance of express
const app = express();
const PORT = process.env.PORT || 8080;

//View engine
app.set("view engine", "ejs");
app.set("views", "./views");

//Middleware for serving static files
app.use(express.static('public'));

//Middleware for rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 10,
    message: 'Too  many requests.  Please wait 15 minutes.',
});

app.use(limiter);

//Express router file
app.use(userRoute);

//Starting the server
app.listen(PORT, ()=>{
    console.log(`Connected to port ${PORT}`);
});