var Meetup = require('../models/meetup'); //define Meetup model

exports.create = function (req, res) {
	var meetup = new Meetup(req.body);
	meetup.save(function(err, result){  //should save to mongoDB
		res.json(result);  // (res=respond) send result(= json) back to client with id on it
	});
}

exports.list = function (req, res){   //take requests ans response
	Meetup.find({}, function(err, results){  //find from mongoose, mongoose returns error or results
		res.json(results); //respond with json with results, client should display it
	})
} //