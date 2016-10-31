"use strict";

import { Database } from "../server.js";

export abstract class Model {
	protected db: any = Database;
}
