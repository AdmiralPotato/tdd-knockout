/**
 * Module dependencies.
 */

var express = require('express');
var lessons = require('./routes/lessons');
var lesson1 = require('./routes/lesson_1');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.directory(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/bower_components',  express.directory(__dirname + '/bower_components'));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', lessons.list);
app.get(/\/lesson\/(\d+)$/, lessons.display);

lesson1.init(app);

//TODO: Add Moniker to reply random names at '/getName/'

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
