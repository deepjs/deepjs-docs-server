var deep = require("deepjs/deep");
require("deep-mongo");
require("deep-restful/lib/collection");

//_________________________________________________________ MAPS DEFINITION 
var services = {
	"/user": deep.ocm({
		admin: deep.Mongo(null, "mongodb://127.0.0.1:27017/testdb", "user"),
		user: {
			backgrounds: ["this::../admin", deep.Disallow("del", "flush")]
		},
		"public": {
			backgrounds: ["this::../user"]
		}
	}, {
		protocol: "user",
		sensibleTo: "roles"
	})
};


module.exports = services;