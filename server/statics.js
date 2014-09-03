var deep = require("deepjs/deep");

// map for static files served by server (the map itself could be OCM)
var statics = {
	"/": [{
		path: deep.globals.rootPath + '/www',
		options: {
			maxAge: 86400000,
			redirect: false
		}
	}]
};

module.exports = statics;