var express = require('express'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	logger = require('morgan'),
	mongoose = require('../libs/mongoose'),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session),
	config = require('../libs/config');

var sesVals = config.get('session');

module.exports = function(app){
    app.use(logger('dev'))
		.use(bodyParser.json())
		.use(bodyParser.urlencoded({ extended: false }))
		.use(cookieParser())
		.use(session({
            secret: sesVals.secret,
            name: sesVals.name ,
            cookie: sesVals.cookie,
            resave: false,
            saveUninitialized: true,
            store: new MongoStore({mongooseConnection: mongoose.connection})
        }));
};
