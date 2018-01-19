require("dotenv").config();

//creating variables for the npm's
var fs = require('fs');
var request = require('request');
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');
//variables for user
//var nodeArgs = process.argv;
var input = process.argv[3]
var command = process.argv[2]
//default variables
var defaultSong = "The Sign"
var defaultMovie = "Mr.Nobody"
//access keys
var spotify = new Spotify(keys.spotify);
var client = new twitter(keys.twitter);


//for loop takes user input and adds into a string as opposed to an array
// for (var i=3; i<nodeArgs.length; i++){
// 	input = input + " " + nodeArgs[i];
// }
// console.log(input);




//switch statement seems to be the best way to do this
function newCommand(){
	switch(command){
		case 'my-tweets':
			console.log('Jens most recent tweets: ');
			tweets();
			break

		case 'spotify-this-song':
			if (input === undefined){
					input = defaultSong
			
			console.log('results from Spotify for '+ input + ' ')
			spotifySong(defaultSong)
				}
				console.log('results from Spotify for '+ input + ' ');
				spotifySong(input);
				break

		case 'movie-this':
			if(input === undefined){
				 input = defaultMovie
			
			console.log('results from OMBD for ' + input + ' ')
			movieThis(defaultMovie);
			console.log("If you haven't watched "+'"Mr.Nobody," '+"then you should: http://www.imdb.com/title/tt0485947/\nIt's on Netflix!")	
			}
			movieThis(input)
			console.log('results from OMBD for ' + input + ' ')
			break

		case 'do-what-it-says':
			liriDo();
			break
			default:
			console.log('Please type a command: \nmy-tweets \nspotify-this-song \nmovie-this \ndo-what-it-says')
	}			
}


function tweets(){
var params = {screen_name: 'jenucberkeley'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
	 if (!error) {
	    for (var i = 0; i < tweets.length; i++) {
	    	console.log('@'+tweets[i].user.screen_name+' tweeted: \n\n'+tweets[i].text)
	    	console.log('\nat '+tweets[i].created_at)
	    	console.log('------------------------------')
	    }
	  }else{console.log(error)}
	})
}
  	


function spotifySong(song){
spotify.search({ type: 'track', query: input }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  		}
	  for (var i = 0; i < data.tracks.items.length; i++) {
	  console.log('Artist: '+data.tracks.items[i].artists[0].name)
	  console.log('Title: '+data.tracks.items[i].name)
	  console.log('Preview Link: '+data.tracks.items[i].preview_url)
	  console.log('Album: '+data.tracks.items[i].album.name)
	  console.log('------------------------------')
	}
	})
}

function movieThis() {

    var queryURL = "https://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy"
    request(queryURL, function (error, response, body){
    	var data = JSON.parse(body)
    	// console.log(data)
    	console.log('Title: '+data.Title)
    	console.log('Year: '+data.Year)
    	console.log('Rating: '+data.imdbRating)
    	console.log('Rotten Tomatoes rating: '+data.Ratings[1].Value)
    	console.log('Country: '+data.Country)
    	console.log('Language: '+data.Language)
    	console.log('Plot: '+data.Plot)
    	console.log('Actors: '+data.Actors)
	})
}


function liriDo() {
  	fs.readFile("random.txt", "utf8", function(err, data) {
	    if (err) {
	      return console.log(err);
	    }
		// separate data into command and Input
		data = data.split(",");
		command = data[0]
		userInput = data[1]
		console.log('you want me to run '+ command +' on '+ Input)
		newCommand(command)
	})
}





newCommand()








