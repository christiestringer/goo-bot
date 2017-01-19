console.log("The bot is starting");

var Twit = require('twit');
var Yelp = require('yelp');

var config = require('./config');
var yelpconfig = require('./yelpconfig');

var yelp = new Yelp(yelpconfig);
var T = new Twit(config);

var stream = T.stream('user');
stream.on('tweet', tweetEvent);

function tweetEvent(eventMsg) {

    var replyto = eventMsg.in_reply_to_screen_name;
    var text = eventMsg.text;
    var from = eventMsg.user.screen_name;
    console.log(text);

    var location = separateTweet(text);
    list = search();
    // for( var i = 0 ; i <= list.length -1; i++){
    //     console.out(list[i]);
   // }

    //console.log("length of list at tweetEvent: " + listRest.length);

//    if(replyto === 'christieupskill'){
//        var newtweet = '@' + from + ' restaurants in your area ' ;
//        tweetIt(newtweet);
//    }
}
function search(){
    yelp.search({ term: 'food', location: 'Montreal' }), (data)=>{
        allData = data;
        var food = data.businesses;
        var list = [];
        for(var i = 0; i< food.length; i++){
            list.push(food[i].name);
            console.log(food[i].name);
        }
        for(var j= 0; j< list.length; j++){
            console.log(list[j]);
        }
        if(list!=undefined) {
            return list;
        }, (err) => {
            console.error(err);
        }
    );
}
function getList(data){
    var food = data.businesses;
    var list = [];
    for(var i = 0; i< food.length; i++){
        list.push(food[i].name);
        console.log(food[i].name);
    }
    return list;
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


//
// function getRestaurants(location){
//     var bigData = '';
//     // var params = {
//     //     term: 'food',
//     //     location: location
//     // }
//
//     yelp.search({ term: 'food', location: 'Montreal' })
//         .then(function (data) {
//             console.log(data);
//         })
//     gotData(bigData);
//
//     console.log('list at getRest: '+ gotData.length);
//     return gotData;
// }
//
// function gotData(data){
//     var restaurants = data.businesses;
//     console.log(restaurants.length);
//     var listRest = [];
//     for(var i = 0; i< restaurants.length; i++){
//         // console.log(restaurants[i].name);
//         listRest.push(restaurants[i].name);
//     }
//     console.log('list at GotData: '+ listRest.length);
//     return listRest;
//}