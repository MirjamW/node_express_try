"use strict";

import { View } from "../core/View.js";

export class Index extends View {
	constructor(req, res) {
		super(req, res);
	}

	public sampleOutput(req, res) {
    if (req.session.name != undefined) {
      res.json({ text: "Hello " + req.session.name + "!" });
    }
    else {
        res.json({ text: "Hello World!" });
    }
	}
}
