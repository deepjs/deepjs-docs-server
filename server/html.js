var deep = require("deepjs");
require("deep-views/lib/view");
require("deep-node/lib/rest/file/json").create({
	protocol: "json",
	basePath: "/www"
});
require("deep-swig/lib/nodejs");

deep.swig.nodejs({
	protocol: "swig",
	basePath: "/www"
});

// map for html pages produced by server. the map itself, or the entries of the map, could be OCM.
var htmls = {
	/*index:deep.View({
		how:"swig::/index.html",
		where:"dom.appendTo::",		// NO ARGS SAYS : use html merge rules,
		subs:require("../www/libs/deep-browser/lib/dummies").routes
	})*/
};

module.exports = htmls;

