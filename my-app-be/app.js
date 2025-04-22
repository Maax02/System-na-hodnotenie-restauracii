var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var session = require('express-session');
const PgSession = require("connect-pg-simple")(session);
var pool = require('./config/db.js');

const { config } = require('./config/config.js');
require('dotenv').config()

var restaurantsRouter = require('./routes/api_v1/restaurants');
//var restaurantByIdRouter = require('./routes/api_v1/restaurants');

var addUserRouter = require('./routes/api_v1/users');

var reviewByRestaurantId = require('./routes/api_v1/reviews');
//var restaurantReviewAvg = require('./routes/api_v1/reviews');

var authRouter = require('./routes/api_v1/auth');

var app = express();

// various middlewares
// logs HTTP requests to the console
app.use(logger('dev'));
// parses HTTP requests with JSON payloads
app.use(express.json());
// parses HTTP requests with URL-encoded data
app.use(express.urlencoded({ extended: false }));
// parses cookies
app.use(cookieParser());
// serves static files
// app.use(express.static(path.join(__dirname, 'public')));


if (process.env.STATUS === 'production') {
    // trust proxy needed for secure cookie to work on render.com
    // because render.com uses a reverse proxy to handle HTTPS requests
    // and forwards the requests to the backend server over HTTP
    app.set('trust proxy', 1);
}


app.use(
    session({
        store: new PgSession({
            pool, 
            tableName: "session", 
        }),        
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        name: config.session.cookieName,
        cookie: {
            secure: process.env.STATUS === 'production',
            httpOnly: true,
            sameSite: process.env.STATUS === 'production'?'none':'lax',
            maxAge: 1000 * 60 * 60 * 24 }            
             
    })    
);

app.use('/api/v1/restaurants', restaurantsRouter);
//app.use('/api/v1/restaurants/:id', restaurantByIdRouter);

app.use('/api/v1/users', addUserRouter);

app.use('/api/v1/reviews/', reviewByRestaurantId);
//app.use('/api/v1/reviews/', restaurantByIdRouter);

app.use('/api/v1/auth', authRouter);

module.exports = app;
