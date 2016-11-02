"use strict";

import { Database } from "../server.js";
import { Model } from "../core/Model.js";
import { View } from "../core/View.js";

/**
 * Controller class template
 * @author jankarres
 */
export abstract class Controller {
	// Import database object in model
	protected db: any = Database;
	// Model object with same name as Controller
	protected model: any;
	// View object with same name as Controller
	protected view: any;

	constructor(req, res) {
		// Import concrete model and view
		var Model = require('../model/' + this.getClassName() + '.js');
		var View = require('../view/' + this.getClassName() + '.js');

		// Create instance of model and view
		this.model = new Model[this.getClassName()]();
		this.view = new View[this.getClassName()](req, res);
	}

	/**
	 * Get name of this class
	 * @return { string } - Name of class
	 */
	public getClassName() {
		return this.constructor.name;
	}
}
