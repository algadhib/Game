//init the required packages
var express = require('express');
var app = express();
const exphbs = require('express-handlebars');

//init the view engine
app.engine('handlebars', exphbs({defaultLayout: 'main.handlebars.html'}));
app.set('view engine', 'hbs');

//serving the static pages
app.use(express.static('./public'));


//serving the main page
app.get('/', function(req, res, next)  {
   var context = {};             //create the contex obj
   res.status(200);
   res.render('gamesList.handlebars', context);
});

//serving the 404 page
app.use(function(req, res) {
  res.status(404);
  res.render('404Page.handlebars');
});

//setting the port to the env variable or 3000 as default
var port = process.env.PORT || 3000;
app.listen(port);
