var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

var twitterKeys = new Twitter(keys.twitter);
var Spotify = new Spotify(keys.spotify);
var Omdb = keys.omdb.api_key

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

if (userInput1 === "spotify-this-song") {
	
	if (userInput2 === undefined) {
		
		spotifyThis("The Sign Ace of Base");
	}

	else {

		spotifyThis(userInput2);

	}
}



//OMDB API

if (userInput1 === "movie-this") {

	if (userInput2 === undefined) {

		movieThis("mr+nobody")
	}

	else {

		movieThis(userInput2)

	}


}


function movieThis (input) {

	var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=" + Omdb;

		request(queryUrl, function (error, response, body) {

			if (!error && response.statusCode === 200) {

				console.log("Title: " + JSON.parse(body).Title);
            	console.log("Year: " + JSON.parse(body).Year);
            	console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            	console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
            	console.log("Country: " + JSON.parse(body).Country);
            	console.log("Plot: " + JSON.parse(body).Plot);
            	console.log("Actors: " + JSON.parse(body).Actors);

			}

		})

}

function spotifyThis (input) {

	Spotify.search({ type: 'track', query: input }, function(err, data) {
		if (err) {
		return console.log('Error occurred: ' + err);
		}
	 
		console.log(data.tracks.items[0].album.artists[0].name);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].preview_url);	
	});

}

