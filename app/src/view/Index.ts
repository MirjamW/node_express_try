"use strict";

import { View } from "../core/View.js";

/**
 * Index view: Hello world example
 */
export class Index extends View {
	constructor(req, res) {
		super(req, res);
	}

	/**
	 * Output of "Hello, World!" text
	 * @parm req - Request object
	 * @parm req - Response object
	 */
	public sampleOutput(req, res) {
		res.json({ text: "Hello, World!" });
	}
}
