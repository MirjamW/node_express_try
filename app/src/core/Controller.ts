"use strict";

import { Database } from "../server.js";
import { Model } from "../core/Model.js";
import { View } from "../core/View.js";

export abstract class Controller {
	protected db: any = Database;
	protected model: any;
	protected view: any;

	constructor(req, res) {
		// Import model and view
		var Model = require('../model/' + this.getClassName() + '.js');
		var View = require('../view/' + this.getClassName() + '.js');

		this.model = new Model[this.getClassName()]();
		this.view = new View[this.getClassName()](req, res);
	}

	public getClassName() {
		return this.constructor.name;
	}
}
