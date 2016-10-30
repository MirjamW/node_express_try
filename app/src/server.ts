"use strict";

/*
 * Use express framework as wrapper of application
 * Import all requirements
 */
var express = require('express');
var app = express();
var path = require('path');

var config: any = {};
config.webserver = require('../../config/webserver.json');

var bodyParser = require('body-parser');
var morgan = require('morgan');

/*
 * Use morgan logger to log http access into console
 */
app.use(morgan('tiny'));

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
