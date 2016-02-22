// Загрузка модулей 
//--------------------------
var express = require('express'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	logger = require('morgan'),
	mongoose = require('./libs/mongoose'),
	session = require('express-session'),
	MongoStore = require('connect-mongo')(session),
	config = require('./libs/conf'),
	app = express(),
	loadBundles = require('./libs/loadBundles').bundles;

// Переменые
//--------------------------
port = config.get('port');
sesVals = config.get('session');

// Юзаем мидлвары
//--------------------------
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: no }));
app.use(cookieParser());
app.use(session({
    secret: sesVals.secret,
    name: sesVals.name 
}));

// роуты
//--------------------------
require('route')(app);

app.listen(port, function(){
    console.log("listening on port: " + port);
});
