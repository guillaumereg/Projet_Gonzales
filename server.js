var express = require('express'), //importer module express
	app		= express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	meetupsController = require('./server/controllers/meetups-controller')

//app use: binding middleware to your application
//app get: used to retrieve information from the given server
//app post: used to send data to the server pe customer information, file upload, etc. using HTML forms.

app.get('/', function(req,res){ 
	res.sendFile(__dirname + '/index.html');
});

mongoose.connect('mongodb://localhost:27017/mean-demo');

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false})); 

app.use('/js',express.static(__dirname + '/js')); //use all files in js directory

app.use('/angular',express.static(__dirname + '/node_modules/angular'));

app.use('/angular-resource',express.static(__dirname + '/node_modules/angular-resource'));


//restful API (Representational State Transfer)
app.get('/api/meetups', meetupsController.list); //when somebody calls this route, call this function
app.post('/api/meetups', meetupsController.create);  //when somebody calls this route, call this function

app.listen(8000, function(){ //listen on port 8000 and handle requests on it.
	console.log('Je vous écoute...');
});
