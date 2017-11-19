var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

var twitterKeys = new Twitter(keys.twitter);
var Spotify = new Spotify(keys.spotify);

var userInput1 = process.argv[2];
var userInput2 = process.argv[3];

//Twitter API

if (userInput1 === "my-tweets") {

	var params = {screen_name: 'HTownProgram'};
	twitterKeys.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {

	  	for (var i = 0; i < tweets.length; i++) {
	  		console.log("Tweet: '" + tweets[i].text + "' created on " + tweets[i].created_at )
	  	}
	  }
	});
}



//Spotify API

if (userInput1 === "spotify-this-song")
	if (userInput2 === undefined) {
		console.log("This works")
	}

	else {

	Spotify.search({ type: 'track', query: userInput2 }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	 
	console.log(data); 
	});

}

else {

//OMDB API

var movieName = "Inception";

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

console.log(queryUrl);

request(queryUrl, function (error, response, body) {

	if (!error && response.statusCode === 200) {

	console.log(JSON.parse(body));

	console.log("The release year for the movie is " + JSON.parse(body).Year)

	}

})

}

