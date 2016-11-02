"use strict";
/**
 * Utility: createRoute
 * Create a new route with MVC template
 * @author jankarres
 */

/*
 * Import required packages
 */
var fs = require('fs');
var jsonfile = require('jsonfile');

/*
 * Create roUte with controller, model and view
 */
function createRoute(humanableName, method, url, controller) {
  // Write route to json file
  var routeConfigFile = 'config/route.json';
  var routeConfig = jsonfile.readFileSync(routeConfigFile);

  if (routeConfig[humanableName] != undefined) {
    console.log("\n\nSorry, but this route already exists.\n");
    console.log("abort.");
  }

  routeConfig[humanableName] = {};
  routeConfig[humanableName]['method'] = method;
  routeConfig[humanableName]['url'] = url;
  routeConfig[humanableName]['controller'] = controller;

  jsonfile.writeFileSync(routeConfigFile, routeConfig, {spaces: 2});

  // Create controller, model and view
  var controllerContent = `"use strict";

import { Controller } from "../core/Controller.js";

/**
 * ` + controller + ` controller
 */
export class ` + controller + ` extends Controller {
  // private db: any = Database;
	// private model: Model;
  // private view: View;

  constructor(req, res) {
		super(req, res);
  	res.end();
  }
}`;

  fs.writeFileSync('app/src/controller/' + controller + '.ts', controllerContent);

  var modelContent = `"use strict";

import { Model } from "../core/Model.js";

/**
 * ` + controller + ` model
 */
export class ` + controller + ` extends Model {
  // private db: any = Database;
}
`;
  fs.writeFileSync('app/src/model/' + controller + '.ts', modelContent);

  var viewContent = `"use strict";

import { View } from "../core/View.js";

/**
 * ` + controller + ` view
 */
export class ` + controller + ` extends View {
  constructor(req, res) {
  	super(req, res);
  }
}
`;
  fs.writeFileSync('app/src/view/' + controller + '.ts', viewContent);

  console.log("\n\nRoute successfull created.\n");
  console.log("Please compile TypeScript code with your editor or 'tsc -w'\n");
  process.exit(1);
}

/*
 * Ask a fromt question in console
 */
function ask(question, format, callback) {
 var stdin = process.stdin, stdout = process.stdout;

 stdin.resume();
 stdout.write(question + ": ");

 stdin.once('data', function(data) {
   data = data.toString().trim();

   if (format.test(data)) {
     callback(data);
   } else {
     stdout.write("It should match: "+ format +"\n");
     ask(question, format, callback);
   }
 });
}

/*
 * Collect information for new route in console
 */
console.log("Hi, I would like help you to create a new route. Let's get started!\n\n");

ask("Name of page (for only humans)", /.+/, function(humanableName) {
  ask("Method (GET/PUT/POST/DELETE)", /^(GET|PUT|POST|DELETE)$/, function(method) {
    ask("URL (e.g. /product/:id)", /^\/.+/, function(url) {
      ask("Controller (in camelcase; e.g. ProductDetails)", /(^[A-Z][a-z0-9]+$)|(^[A-Z][a-z0-9]+[A-Z]$)|(^[A-Z][a-z0-9]+([A-Z][a-z0-9]+)+$)|(^[A-Z][a-z0-9]+([A-Z][a-z0-9]+)+[A-Z]$)/, function(controller) {
        ask("\nAre all values correct? (y/n)", /.+/, function(confirm) {
          if (confirm != 'y') {
            console.log("\n\nabort.");
            process.exit(1);
          }
          else {
            if (fs.existsSync('app/src/controller/' + controller + '.ts') || fs.existsSync('app/src/model/' + controller + '.ts') || fs.existsSync('app/src/view/' + controller + '.ts')) {
              console.log("\n\nSorry, but this controller (controller, model or view file) already exists.\n");
              console.log("abort.");
            }
            else {
              createRoute(humanableName, method, url, controller);
            }
          }
        });
      });
    });
  });
});
