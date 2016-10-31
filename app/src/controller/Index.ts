"use strict";

import { Controller } from "../core/Controller.js";

export class Index extends Controller {
	// private db: any = Database;
	// private model: Model;
	// private view: View;

	constructor(req, res) {
		super(req, res);

		/*
		 * Set example name, if not set on secound request
		 * >> first request response: { "text": "Hello World!" }
		 * >> second request response: { "text": "Hello Franz!" }
		 */
		if (req.session.firstRequest) {
			req.session.name = 'Franz';
		}
		else {
			req.session.firstRequest = true;
		}

		// Send example hello world output
		this.view.sampleOutput(req, res);
		res.end();
	}
}
