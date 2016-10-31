"use strict";

/*
 * Import all requirements
 */
var config: any = {};
config.webserver = require('../../config/webserver.json');
config.database = require('../../config/database.json');
config.session = require('../../config/session.json');

var express = require('express');
var session = require('express-session');
var path = require('path');
var anyDB = require('any-db');
var bodyParser = require('body-parser');
var morgan = require('morgan');

/*
 * Use express framework as wrapper of application
 * Add express-session for session handling
 */
var app = express();
app.use(session({
	secret: config.session.secret,
	resave: config.session.resave,
	saveUninitialized: config.session.saveUninitialized
}));

/*
 * Use morgan logger to log http access into console
 */
app.use(morgan('tiny'));

/*
 * Esablishe database connection (Sqlite3 or MySQL)
 */
var dbErrorHandling = function(err) {
	if (err != null) {
		console.log('Sorry, cannot establish database connection. Please check your database server or database configuration.');
		console.log(err);

		process.exit(1);
	}
};

if (config.database.driver == 'sqlite3') {
	var db = anyDB.createConnection(config.database.driver + '://' + config.database.username + ':' + config.database.password + '@' + config.database.database + '.sqlite', dbErrorHandling);
}
else {
	var db = anyDB.createConnection(config.database.driver + '://' + config.database.username + ':' + config.database.password + '@' + config.database.hostname + '/' + config.database.database, dbErrorHandling);
}

export { db as Database };
delete config.database;

/*
 * Parse body of json request for routes in utf-8
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
 * Deliver static files from public/
 */
app.use(express.static('public'));

/*
 * Handel uncaught exception as awesome console output
 */
process.on('uncaughtException', function(err) {
	// Ensure port for webserver is avalible
	if (err.errno === 'EADDRINUSE') {
		console.log('Sorry, cannot start web server. Port ' + config.webserver.port + ' is already in use.');
	}
	else {
		console.log(err);
	}

	process.exit(1);
});

/*
 * Start webserver at port from package.json
 */
app.listen(config.webserver.port, function() {
	console.log('Webserver runs at port http://127.0.0.1:' + config.webserver.port);
});

/*
 * Define routes via express.js; start with constructor of controller
 * Route definitions outsources to configure in config/route.json
 */
const routes = require('../../config/route.json');
var controller: any;

for (var route in routes) {
	controller = require('./controller/' + routes[route]['controller'] + '.js');

	if (routes[route]['method'] == 'GET') {
		app.get(routes[route]['url'], function(res, req) {
			new controller[routes[route]['controller']](res, req);
		});
	}
	else if (routes[route]['method'] == 'PUT') {
		app.put(routes[route]['url'], function(res, req) {
			new controller[routes[route]['controller']](res, req);
		});
	}
	else if (routes[route]['method'] == 'POST') {
		app.post(routes[route]['url'], function(res, req) {
			new controller[routes[route]['controller']](res, req);
		});
	}
	else if (routes[route]['method'] == 'DELETE') {
		app.delete(routes[route]['url'], function(res, req) {
			new controller[routes[route]['controller']](res, req);
		});
	}
	else {
		console.log("FATAL ERROR: Routes are not valid.");
		process.exit(1);
	}
}

// Error 404 page not found
app.all('*', function(req, res) {
	res.status(404).json();
});
