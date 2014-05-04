var express = require('express.io'); 
var path = require('path'); 
var app = express().http().io(); // Returns an object which contains the methods. - Express returns http, which returns io which returns app.

// Configuring our environments
app.configure(function(){
  app.use(express.cookieParser());  
  app.use(express.bodyParser());    //for handling post data
  app.use(express.static(path.join(__dirname, 'public'))); //for handling static contents
  app.use(express.session({secret: 'monkey'})); //for using sessions
  app.set('view engine', 'ejs'); 
});

//we're going to have /routes/index.js handle all of our routing
var route = require('./routes/index.js')(app); // Requires the routes/index page and pass app to routes page.

app.listen(1337); // Creates a port and localhost.


