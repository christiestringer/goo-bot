console.log("The bot is starting");

var Twit = require('twit');
var config = require('./config');

var T = new Twit(config);

//function getLocation(){
//    var params = {
//    }
//        q: '#RestaurantLocation',
//        count: 10
//    }
//
//    T.get('search/tweets', params, gotData);
//
//    function gotData(err, data, response) {
//        var tweets = data.statuses;
//        for (var i = 0; i < tweets.length; i++){
//          console.log(tweets[i].text);
//        }
//    }
//}



var stream = T.stream('user');
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg){
//    var fs = require ('fs');
//    var json = JSON.stringify(eventMsg,null,2);
//    fs.writeFile("tweet.json", json);

    var replyto = eventMsg.in_reply_to_screen_name;
    var text = eventMsg.text;
    var from = eventMsg.user.screen_name;
    console.log(text);

    var location = separateTweet(text);

    if(replyto === 'christieupskill'){
        var newtweet = '@' + from + ' your tweet ' + location;
        tweetIt(newtweet);
    }
}

function separateTweet(txt){
    return (txt.substr(txt.indexOf(' ')+1));
}

function tweetIt(txt){
    var tweet = {
        status: txt
    }

    T.post('statuses/update', tweet, tweeted);

    function tweeted(err, data, response) {
        if(err){
        console.log("Something went wrong!");
        }else{
        console.log("It worked!");
        }
//      console.log(data)
    }
}