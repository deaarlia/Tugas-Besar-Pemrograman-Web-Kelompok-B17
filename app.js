require('dotenv').config();
var express = require('express');
var path = require('path');
var session = require('express-session');
var cors = require('cors');

var authRouter = require('./routes/auth');

var app = express();

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,
        maxAge: 1000 * 60 * 60 * 1
    }
}));

app.use('/api/auth', authRouter);

module.exports = app;