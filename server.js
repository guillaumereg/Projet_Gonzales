var express = require('express'),
	app		= express();

app.get('/', function(req,res){ //=define routes, when someone makes a get request to root directory, respond by sending file named index.html
	res.sendFile(__dirname + '/index.html');
});

//app.use('/js',express.static(__dirname + '/client/js')); //anytime user requests /js, use helper function = reply with client/js

app.use('/js',express.static(__dirname + '/js'));

app.listen(8000, function(){ //listen on port 8000 and handle requests on it.
	console.log('Je vous écoute...');
});
