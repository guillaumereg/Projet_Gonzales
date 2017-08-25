var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var router = express.Router();

var User = require('./backend/models/user.js');
var Offer = require('./backend/models/offer.js');
var Evaluation = require('./backend/models/evaluation.js');

var appRoutes = require('./backend/routes/api.js')(router);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/frontend')); //utilise tous les fichiers contenus dans ce répertoire
app.use('/api',appRoutes);


mongoose.connect('mongodb://localhost/rentCar');


app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/frontend/index.html'));
});



app.listen(8000, function(){ //listen on port 8000 and handle requests on it.
	console.log('Serveur actif sur port 8000');
});
