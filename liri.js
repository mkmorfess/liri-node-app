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

		myTweets();
		
	
}



//Spotify API

if (userInput1 === "spotify-this-song") {
	
	if (userInput2 === undefined) {
		
		spotifyThis("The Sign Ace of Base");
		logging();
	}

	else {

		spotifyThis(userInput2);
		

	}
}



//OMDB API

if (userInput1 === "movie-this") {

	if (userInput2 === undefined) {

		movieThis("mr+nobody");
		
	}

	else {

		movieThis(userInput2);
		

	}


}

//reads information from the random.txt file and runs the commands

if (userInput1 === "do-what-it-says") {
	fs.readFile("random.txt", "utf8", function(error, data) {

		if (error) {
    		return console.log(error);
  		}

  		var dataArr = data.split(", ");

  		console.log(dataArr);

  		for (var i = 0; i < dataArr.length; i++) {

  		if (dataArr[i] === "spotify-this-song") {

  				i++;

  				spotifyThis(dataArr[i]);
  				

  		}

  		

  		if (dataArr[i] === "movie-this") {

  			i++;

  			movieThis(dataArr[i]);
  			
  		}

  		if (dataArr[i] === "my-tweets") {

  			myTweets();
  			

  		}

  		}

	})
}

//function for the movie API


function movieThis (input) {

	var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=" + Omdb;

		request(queryUrl, function (error, response, body) {

			if (!error && response.statusCode === 200) {

				console.log("Title: " + JSON.parse(body).Title);
            	console.log("Year: " + JSON.parse(body).Year);
            	console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            	console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
            	console.log("Country: " + JSON.parse(body).Country);
            	console.log("Language: " + JSON.parse(body).Language)
            	console.log("Plot: " + JSON.parse(body).Plot);
            	console.log("Actors: " + JSON.parse(body).Actors);

            	logging();
			}


		})

}

//function for spotify API

function spotifyThis (input) {

	Spotify.search({ type: 'track', query: input }, function(err, data) {
		if (err) {
		return console.log('Error occurred: ' + err);
		}
	 
		console.log(data.tracks.items[0].album.artists[0].name);
        console.log(data.tracks.items[0].album.name);
        console.log(data.tracks.items[0].name);
        console.log(data.tracks.items[0].preview_url);

        logging();	
	});

}

//function for tweets

function myTweets () {

		var params = {screen_name: 'HTownProgram'};
	twitterKeys.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {

	  	for (var i = 0; i < tweets.length; i++) {
	  		console.log("Tweet: '" + tweets[i].text + "' created on " + tweets[i].created_at )
	  	}

	  	logging();
	  }
	});

}

//function for logging user inputs

function logging () {

	var userLog = [process.argv[2], " " + process.argv[3] + ", "];

	if (process.argv[3] === undefined) {

			userLog = [process.argv[2] + ", "]
				
			}

	fs.appendFile("log.txt", userLog, function (err) {

		if (!err){

			console.log("Data Logged");

		}

	})

}

