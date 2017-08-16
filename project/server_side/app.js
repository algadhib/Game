//init the required packages
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

// the uri for connecting to mongo
// format: mongodb://user:password@host/database
// **** CHANGE TO YOUR USER_NAME AND PASSWORD ********/
var mongoUri = process.env.MONGO_URI || "mongodb://cs290_algadhim:FinalProjectGame@classmongo.engr.oregonstate.edu/cs290_algadhim";
// var mongoUri = "mongodb://localhost/test"; // for connecting to a locally running mongodb instance

// connecting to the mongo database via mongoose
mongoose.connect(mongoUri);

// used to parse the POST requests
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


// init the view engine
app.engine('handlebars', exphbs({defaultLayout: 'main.handlebars.html'}));
app.set('view engine', 'hbs');

// serving the static pages
app.use(express.static('./public'));

// setting up the cookieParser
// use signed cookies.
app.use(cookieParser("gameCookie"));

// initializing the session middleware
app.use(session({
  secret: 'Game', // the secret for signing cookies
  saveUninitialized: 'true', // a connection is automatically given a session, if it doesn't have ones
  resave: 'true' // resaves a session every time it is seen in a request. Recommended that it is set to 'true'
}));

// setting up passport

// using body parser to parse the form data
// This will add a body property to the request, containing the varialble
// we sent in the reuqest
app.use(bodyParser.urlencoded({ extended: true }));

//serving the main page
app.get('/', function(req, res, next)  {
   var context = {};             //create the contex obj
   context.registered = false;
   context.showProfile = true;
   context.home = true;
   res.status(200);
   res.render('gamesList.handlebars', context);
});

app.post('/signup', function(req, res)   {
   console.log("post req signup");
   console.log(req.body.userName);
   console.log(req.body.password);
   res.redirect('/');
   //res.render('gamesList.handlebars', context);
});

app.post('/logout', function(req, res)   {
   console.log("post req logout");
   console.log(req.body.userName);
   console.log(req.body.pwd);
   res.redirect('/');
   //res.render('gamesList.handlebars', context);
});

app.post('/login', function(req, res)   {
   console.log("post req login");
   console.log(req.body.userName);
   console.log(req.body.password);
   res.redirect('/');
   //res.render('gamesList.handlebsars', context);
});

//serving the main page
app.get('/tictac', function(req, res, next)  {
   var context = {};             //create the contex obj
   context.registered = true;
   context.gameName = true;
   context.showProfile = true;
   context.showProfile = true;
   res.status(200);
   res.render('playGame.handlebars', context);
});

app.get('/connected4', function(req, res, next)  {
   var context = {};             //create the contex obj
   context.registered = true;
   context.gameName = false;
   context.showProfile = true;
   context.showProfile = true;
   res.status(200);
   res.render('playGame.handlebars', context);
});

app.get('/profile', function(req, res, next)  {
   var context = {};             //create the contex obj
   context.registered = true;
   //context.gameName = false;
   context.showProfile = true;
   context.profile = true;
   //context.showProfile = true;
   res.status(200);
   res.render('profile.handlebars', context);
});

app.get('/leaderboard', function(req, res, next)  {
   var context = {};             //create the contex obj
   context.registered = true;
   //context.gameName = false;
   context.showProfile = true;
   //context.showProfile = true;
   context.leaderboard = true;
   res.status(200);
   res.render('leaderboard.handlebars', context);
});


//serving the 404 page
app.use(function(req, res) {
  res.status(404);
  res.render('404Page.handlebars');
});

//setting the port to the env variable or 3000 as default
var port = process.env.PORT || 3000;
app.listen(port);
