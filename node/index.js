var Twit = require('twit');
var Yelp = require("yelp");
var config = require('./config');
var yelpconfig = require('./yelpconfig');
var T = new Twit(config);
var yelp = new Yelp(yelpconfig);
var yelp = new Yelp(yelpconfig);

var restList = [];


var stream = T.stream('user');
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {

    var replyto = eventMsg.in_reply_to_screen_name;
    var text = eventMsg.text;
    var from = eventMsg.user.screen_name;
    var location = separateTweet(text);

    if(replyto === 'christieupskill'){
        search(location, from);
    }
}

function separateTweet(txt){
    return (txt.substr(txt.indexOf(' ')+1));
}

function tweetIt(txt){
    var tweet = {
        status: txt
    };

    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
        if(err){
        console.log("Something went wrong!");
        }else{
        console.log("It worked!");
        }
    }
}







function search(location, user) {
    yelp.search({term: 'restaurants', location: location, limit: '4', sort:'2', radius_filter: '4000'})
        .then(function (data) {

            let temp = "";

            var list = [];
            // console.log(data); // print the data returned from the API call
            var jsonString = JSON.stringify(data); // convert data to JSON string
            jsonBussObj = JSON.parse(jsonString).businesses; // Parse JSON string to JSON Object
            for(var i = 0; i< jsonBussObj.length; i++){
                list.push(jsonBussObj[i].name);
                // console.log(jsonBussObj[i].name);
            }
            for(var j = 0; j< list.length; j++){
                if(j == list.length-1){
                    temp += 'or ' + list[j];
                }
                else{
                    temp += list[j] + ", ";
                }
                console.log(list[j]);

            }


            var newtweet = '@' + user + ' have you tried... ' + temp + " in " + location ;

            tweetIt(newtweet);

        })
        .catch(function (err) {
            console.error(err);
        });
}