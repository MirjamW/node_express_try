"use strict";

export class Index {
	constructor(req, res) {
		res.json({ statuscode: 201 });
		res.end();
	}
}
