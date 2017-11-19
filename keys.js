var Twitter = require('twitter');
 
var twitterKeys = new Twitter({
  consumer_key: '5F46F6u8bbAy171ymuVMBfH7s',
  consumer_secret: 'BtUgLqwPjWQtfTkXLEIO5kG7cVcHA5qSRcJoQwE1lK8H6AZ86c',
  access_token_key: '932332201949220864-czBgpk3NzoVxTDIFcl8vIDzDs7Tc15U',
  access_token_secret: 'YRloriPFeFW6VFVb4895dUH8fQtSVLbBDKerVos1fGGSc'
});


module.exports = twitterKeys;
 
var params = {screen_name: 'HTownProgram'};
twitterKeys.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});



var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: "ab702346dbe44c7b9c82ff812e354a78",
  secret: "dcde983351da45aca7f316a40133bbbc"
});
 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});



var request = require("request");

var movieName = "Inception";

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

console.log(queryUrl);

request(queryUrl, function (error, response, body) {

	if (!error && response.statusCode === 200) {

	console.log(JSON.parse(body));

	console.log("The release year for the movie is " + JSON.parse(body).Year)

	}

})