"use strict";

import { Controller } from "../core/Controller.js";

/**
 * Index controller: Hello world example
 */
export class Index extends Controller {
	// private db: any = Database;
	// private model: Model;
	// private view: View;

	constructor(req, res) {
		super(req, res);

		// Send example "Hello, World!" output
		this.view.sampleOutput(req, res);

		// End of responss; send to client
		res.end();
	}
}
