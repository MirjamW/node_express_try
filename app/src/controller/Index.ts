"use strict";

import { Controller } from "../core/Controller.js";

export class Index extends Controller {
	constructor(req, res) {
		super();

		res.json({ text: "Hello World!" });
		res.end();
	}
}
