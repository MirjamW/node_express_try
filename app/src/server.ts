"use strict";
/**
 * Server main files: start point of webserver
 * @author jankarres
 */

/*
 * Import requirements and config files
 */
var config: any = {};
config.webserver = require('../../config/webserver.json');
config.database = require('../../config/database.json');
config.session = require('../../config/session.json');
config.route = require('../../config/route.json');

var express = require('express');
var session = require('express-session');
var sessionFileStore = require('session-file-store')(session);
var path = require('path');
var anyDB = require('any-db');
var bodyParser = require('body-parser');
var morgan = require('morgan');

/*
 * Use express framework for webserver
 * 	Add package express-session for session handling; store session files in session/
 */
var app = express();
app.use(session({
	secret: config.session.secret,
	resave: config.session.resave,
	saveUninitialized: config.session.saveUninitialized,
	cookie: {
		maxAge: config.session.cookie.maxAge
	},
	store: new sessionFileStore({ logFn: function() { } })
}));

/*
 * Use morgan as logger to log http access into console
 */
app.use(morgan('tiny'));

/*
 * Use any-db as abstraction layer for database access
 * Esablishe database connection: Sqlite3 or MySQL
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
 * Use bodyParser as http body parser for all routes
 * Parse json content in reqest in charset utf-8
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
 * Deliver static files from public/
 */
app.use(express.static('public'));

/*
 * Handel uncaught exception for used port as awesome console output
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
 * Start express webserver at port from config
 */
app.listen(config.webserver.port, function() {
	console.log('Webserver runs at port http://127.0.0.1:' + config.webserver.port);
});

/*
 * Define express routes; start with MVC model controller constructor
 * Route definitions outsourced in config/route.json
 */
var routes = config.route;
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

// Error 404 (page not found) route for all type of requests
app.all('*', function(req, res) {
	res.status(404).json();
});
