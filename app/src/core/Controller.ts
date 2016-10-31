"use strict";

import { Database } from "../server.js";

export abstract class Controller {
	private db: any = Database;
}
