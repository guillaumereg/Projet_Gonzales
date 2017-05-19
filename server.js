var express = require('express'),
	app		= express();

app.get('/', function(req,res){ //=define routes, when someone makes aget request to root directory, respond by sending file named index.html
	res.sendFile(__dirname + '/index.html');
});

app.listen(8000, function(){ //listen on port 8000 and handle requests on it.
	console.log('Je vous écoute...');
});
