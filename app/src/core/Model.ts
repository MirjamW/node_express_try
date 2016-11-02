"use strict";

import { Database } from "../server.js";

/**
 * Model class template
 * @author jankarres
 */
export abstract class Model {
	// Import database object in model
	protected db: any = Database;
}
