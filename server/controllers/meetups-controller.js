//controller for /api/meetups

var Meetup = require('../models/meetup'); //define Meetup model

// Assuming this is from a POST request and the body of the
// request contained the JSON of the new "meetup" item to be saved
exports.create = function (req, res) {  //req = meetup from meetup.$save
	var meetup = new Meetup(req.body); //res= HTTP response that Express sends when it gets an HTTP request
	meetup.save(function(err, result){  //should save to mongoDB
		res.json(result);  //  send json content of result back to client
	});
}

exports.list = function (req, res){   //take requests and response
	Meetup.find({}, function(err, results){  //find from mongoose, mongoose returns error or results
		res.json(results); //respond with json with results, client should display it
	})
} 