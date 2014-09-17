/**
 * @author Gilles Coomans
 * example of deep-views/deep-routes html render map
 */
var deep = require("deepjs");
require("deep-mongo");
module.exports = {
	"/user": deep.ocm({
		admin: deep.Mongo(null, "mongodb://127.0.0.1:27017/testdb", "user"),
		user: {
			_backgrounds: ["this::../admin", deep.Disallow("del", "flush")]
		},
		"public": {
			_backgrounds: ["this::../user", deep.AllowOnly("get")]
		}
	}, {
		protocol: "user",
		sensibleTo: "roles"
	}),
	"/foo":deep.Collection("foo", [{ id:"e1", bar:true, zoo:"hello world" }])
};
