var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var path = require('path');
var router = express.Router();

var User = require('./backend/models/user.js');
var appRoutes = require('./backend/routes/api.js')(router);
//require('./passport.js');


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/frontend')); //utilise tous les fichiers contenus dans ce répertoire
app.use('/api',appRoutes);


mongoose.connect('mongodb://localhost/rentCar');
/**
app.use(passport.initialize());
app.use(passport.session());



//app.use('/js', express.static(path.join(__dirname + '../js')));
app.use(express.static(path.join(__dirname, '../client')));

**/

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/frontend/index.html'));
});



app.listen(8000, function(){ //listen on port 8000 and handle requests on it.
	console.log('Serveur actif sur port 8000');
});
