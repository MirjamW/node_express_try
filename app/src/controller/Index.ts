"use strict";

import { Controller } from "../core/Controller.js";

export class Index extends Controller {
	// private db: any = Database;
	// private model: Model;
	// private view: View;

	constructor(req, res) {
		super(req, res);

		// Send example hello world output
		this.view.sampleOutput(req, res);
		res.end();
	}
}
