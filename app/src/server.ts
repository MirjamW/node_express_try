"use strict";

/*
 * Use express framework as wrapper of application
 * Import all requirements
 */
var express = require('express');
var app = express();
const packageConfig = require('../../package.json').config;

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
 * Handel uncaught exception as awesome console output
 */
process.on('uncaughtException', function(err) {
	// Ensure port for webserver is avalible
	if (err.errno === 'EADDRINUSE') {
		console.log('Sorry, cannot start web server. Port ' + packageConfig.port + ' is already in use.');
	}
	else {
		console.log(err);
	}

	process.exit(1);
});

/*
 * Start webserver at port from package.json
 */
app.listen(packageConfig.port, function() {
	console.log('Webserver runs at port http://127.0.0.1:' + packageConfig.port);
});

/*
 * Define routes via express.js
 * Route definitions outsources to configure in route.js
 */

const routes = require('../../route.json');
for (var route in routes) {
	if (routes[route]['method'] == 'GET') {
		app.get(routes[route]['url'], function(req, res) {
			res.json({ statuscode: 200 });
			res.end();
		});
	}
	else if (routes[route]['method'] == 'PUT') {
		app.put(routes[route]['url'], function(req, res) {
			res.json({ statuscode: 200 });
			res.end();
		});
	}
	else if (routes[route]['method'] == 'POST') {
		app.post(routes[route]['url'], function(req, res) {
			res.json({ statuscode: 200 });
			res.end();
		});
	}
	else if (routes[route]['method'] == 'DELETE') {
		app.delete(routes[route]['url'], function(req, res) {
			res.json({ statuscode: 200 });
			res.end();
		});
	}
	else {
		console.log("FATAL ERROR: Routes are not valid.");
		process.exit(1);
	}
}

// Error 404 page not found
app.get('*', function(req, res) {
	res.json({ statuscode: 404 });
});
