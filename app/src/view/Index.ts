"use strict";

import { View } from "../core/View.js";

export class Index extends View {
	constructor(req, res) {
		super(req, res);
	}

	public sampleOutput(req, res) {
		res.json({ text: "Hello World!" });
	}
}
