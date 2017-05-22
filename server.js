var express = require('express'), //importer module express
	app		= express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	meetupsController = require('./server/controllers/meetups-controller')

app.get('/', function(req,res){ //=define routes, when someone makes a get request to root directory, respond by sending file named index.html
	res.sendFile(__dirname + '/index.html');
});

mongoose.connect('mongodb://localhost:27017/mean-demo');

app.use(bodyParser.json());

app.use('/js',express.static(__dirname + '/js')); //use all files in js directory

app.use('/angular',express.static(__dirname + '/node_modules/angular'));

app.use('/angular-resource',express.static(__dirname + '/node_modules/angular-resource'));


//rest API
app.get('/api/meetups', meetupsController.list); //call list method
app.post('/api/meetups', meetupsController.create);  //request, response

app.listen(8000, function(){ //listen on port 8000 and handle requests on it.
	console.log('Je vous écoute...');
});
