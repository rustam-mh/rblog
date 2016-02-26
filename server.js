var express = require('express'),
	app = express(),
	config = require('./libs/config'), // конфиги сайта
	loadBem = require('./libs/loadBem'); // загрузка bem

require('./middlewares')(app); // мидлвары
require('./routes')(app); // роуты

port = config.get('port'); // port

app.listen(port, function(){
    console.log("listening on port: " + port);
});
