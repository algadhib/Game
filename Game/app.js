//init the required packages
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const connectMongo = require("connect-mongo")(session);
const app = express();

// the uri for connecting to mongo
// format: mongodb://user:password@host/database
// **** CHANGE TO YOUR USER_NAME AND PASSWORD ********/
var mongoUri = process.env.MONGO_URI || "mongodb://cs290_algadhim:FinalProjectGame@classmongo.engr.oregonstate.edu/cs290_algadhim";
// var mongoUri = "mongodb://localhost/test"; // for connecting to a locally running mongodb instance

// connecting to the mongo database via mongoose
mongoose.connect(mongoUri);

var accountSchema = new mongoose.Schema({
   username: {type: String, unique: true, index: true},
   score: {type: Number, index: true}
});
accountSchema.plugin(passportLocalMongoose);
const Account = mongoose.model("account", accountSchema);

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// app.use(passport.initialize());
// app.use(passport.session());

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

// use session that are stored in mongo
app.use(session({
    saveUninitialized: false,
    store: new connectMongo({ mongooseConnection: mongoose.connection })
}));

// setting up passport

// using body parser to parse the form data
// This will add a body property to the request, containing the varialble
// we sent in the reuqest
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

//serving the main page
app.get('/', function(req, res, next)  {
   var context = {};             //create the contex obj
   if (req.isAuthenticated()) {
        //console.log('logged in')
        res.locals.authenticated = true;
        res.locals.user = req.user.username;
        res.locals.score = req.user.score;
        //console.log(res.locals.user);
    }
   context.registered = res.locals.authenticated;
   context.userName = res.locals.user
   context.score = res.locals.score
   context.showProfile = true;
   context.home = true;
   res.status(200);
   res.render('gamesList.handlebars', context);
});


app.post('/signup', function(req, res, next) {
    Account.register({username: req.body.userName, score: '0'}, req.body.password,
    function(err, account) {
        if (err) return next(err);
        res.redirect('/');
    });
});

// handle the logout request
app.post('/logout', function(req, res)   {
   req.logout();
   req.session.destroy();
   res.status(200);
   res.redirect('/');
});

//login handler
app.post('/login', passport.authenticate('local', {
   successRedirect: '/',
   failureRedirect: '/faillogin'
}));

//add the points
app.post('/score', function(req, res)  {
   var newScore = parseInt(req.user.score) + parseInt(req.body.score);
   if(req.isAuthenticated())  {
      Account.findByIdAndUpdate(req.user.id, {
        score: newScore
      }).exec(function(err, old){
        if (err) return next(err);
      });
   }
});

//serving tic tac toe game
app.get('/tictac', function(req, res, next)  {
   var context = {};             //create the contex obj
   if (req.isAuthenticated()) {
        //console.log('logged in')
        res.locals.authenticated = true;
        res.locals.user = req.user.username;
        res.locals.score = req.user.score;
        //console.log(res.locals.user);
    }
   context.registered = res.locals.authenticated;
   context.userName = res.locals.user
   context.score = res.locals.score
   context.gameName = true;
   context.showProfile = true;
   context.showProfile = true;
   res.status(200);
   res.render('playGame.handlebars', context);
});

//serve connected4
app.get('/connected4', function(req, res, next)  {
   var context = {};             //create the contex obj
   if (req.isAuthenticated()) {
        //console.log('logged in')
        res.locals.authenticated = true;
        res.locals.user = req.user.username;
        res.locals.score = req.user.score;
        //console.log(res.locals.user);
    }
   context.registered = res.locals.authenticated;
   context.userName = res.locals.user
   context.score = res.locals.score
   context.gameName = false;
   context.showProfile = true;
   context.showProfile = true;
   res.status(200);
   res.render('playGame.handlebars', context);
});


//serve the profile page
app.get('/profile', function(req, res, next)  {
   var context = {};             //create the contex obj
   if (req.isAuthenticated()) {
        //console.log('logged in')
        res.locals.authenticated = true;
        res.locals.user = req.user.username;
        res.locals.score = req.user.score;
        //console.log(res.locals.user);
    }
   context.registered = res.locals.authenticated;
   context.userName = res.locals.user
   context.score = res.locals.score
   context.showProfile = true;
   context.profile = true;
   res.status(200);
   res.render('profile.handlebars', context);
});

// serve the leadder board page
app.get('/leaderboard', function(req, res, next)  {
   var context = {};             //create the contex obj
   context.query = Account.find().sort({ 'score' : 'descending'});
   if (req.isAuthenticated()) {
        //console.log('logged in')
        res.locals.authenticated = true;
        res.locals.user = req.user.username;
        res.locals.score = req.user.score;
        //console.log(res.locals.user);
   }
   context.registered = res.locals.authenticated;
   context.userName = res.locals.user
   context.score = res.locals.score
   context.query.exec(function(err, data) {
    if(err) return next(err);
      context.registered = req.isAuthenticated();
      context.showProfile = true;
      context.leaderboard = true;
      context.username = data;
      res.status(200);
      res.render('leaderboard.handlebars', context);
  });
});

// if loging failed
app.get('/faillogin', function(req, res, next)   {
   res.render('failLogin.handlebars');
});

//serving the 404 page
app.use(function(req, res) {
  res.status(404);
  res.render('404Page.handlebars');
});

//setting the port to the env variable or 3000 as default
var port = process.env.PORT || 3000;
app.listen(port);
