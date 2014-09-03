	deep = require("deepjs");

var express = require('express'),
	autobahn = require("autobahnjs"),
	Unit = require("deepjs/lib/unit"),
	schemaValidator = require("deepjs/lib/schema");


var cookieParser = require('cookie-parser')
var session = require('express-session')
var bodyParser = require('body-parser')

deep.Validator.set(schemaValidator);

deep.globals.rootPath = deep.context.cwd = __dirname;

deep.Modes({
	roles:"public"
});

//_________________________ Start your app construction
var app = express();

var loggedIn = function(session) {
	return session;
};
var autobahnApp = {
	express: app,
	loggedIn: loggedIn,
	protocols: {

	},
	sessionModes: function(session) // use this middleware to get current request roles from session. if you have login, session contains your user.
	{
		// console.log("roles middleware : ", session);
		if (session && session.user)
			return {
				roles: "user"
			}; // if your logged in : you're "user"
		return {
			roles: "public"
		}; // else you're "public"
	},
	loginHandlers: autobahn.login.createHandlers({
		store: "user",
		encryption: "sha1",
		loginField: "email",
		passwordField: 'password',
		loggedIn: loggedIn
	})
};

app
// set simple session management (pure expressjs)
.use(cookieParser())
.use(session({
	resave:false,
	saveUninitialized:true,
	secret: 'paezijp7YlhgiGOUYgtogz',
	maxAge: new Date(Date.now() + 3600000)
}))
// to get body parsed automatically (json/files/..)
.use(bodyParser.json({ strict:false, extended:true }))
.use(autobahn.context.middleware(function(context) {
	return context;
}))
.use(autobahn.modes.middleware(autobahnApp.sessionModes))
.use(autobahn.protocols.middleware(autobahnApp.protocols))
// ------ USER LOGIN/LOGOUT/ROLES MANAGEMENT
.post("/logout", autobahn.logout.middleware()) 
.post("/login", autobahn.login.middleware(autobahnApp.loginHandlers)) 

//____________________________________________________  USE YOUR MAPS
.use(autobahn.restful.map(require("./server/services")))
.use(autobahn.html.map(require("./server/html")))
.use(autobahn.statics.middleware(require("./server/statics")))
///____________________________________________________      Finish app construction
// .use(app.router)
.use(function(req, res, next) {
	console.log("nothing to do with : ", req.url);
	res.writeHead(404, {
		'Content-Type': 'text/html'
	});
	res.end("error : 404");
})
.listen(3000);

deep.App(autobahnApp);

console.log("server is listening on port : ", 3000);

var repl = require("repl")
.start({
	prompt: "node via stdin> ",
	input: process.stdin,
	output: process.stdout
});

//require('repl.history')(repl, process.env.HOME + '/.node_history');



