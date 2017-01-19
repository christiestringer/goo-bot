var Twit = require('twit')

var T = new Twit({
  consumer_key:         '4GRTngY3VgZjrI2sGofTne1Yi',
  consumer_secret:      'wEbegxX0UCVSoAXnENr1WXkjj5ncPijPd1b3SvP9p9j5FZp6zX',
  access_token:         '807037107768160256-DlVf8KKo9y7L6uz4jcY8onIv9mPywyz',
  access_token_secret:  'kenai7Mi1yh4gjCYpZdcV9c8kkem2NR8bsgSdnUjDIkPW',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})


T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  console.log(data)
})