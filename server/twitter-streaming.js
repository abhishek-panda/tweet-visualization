const request = require('request');
const util = require('util');
const fs = require('fs');
const twitterConfig = require('./twitter-config');

let stream = null;
let token;

async function bearerToken ({ consumer_key, consumer_secret }) {
  const requestConfig = {
    url: twitterConfig.BEARERTOKENURL,
    auth: {
      user: consumer_key,
      pass: consumer_secret,
    },
    form: {
      grant_type: 'client_credentials',
    },
    headers: {
      'User-Agent': 'TwitterDevSampledStreamQuickStartJS',
    },
  };
  const post = util.promisify(request.post);
  const response = await post(requestConfig);
  return JSON.parse(response.body).access_token;
}

function streamConnect(token, socket) {
  const config = {
    url: `${twitterConfig.STREAMURL}?expansions=geo.place_id&place.format=detailed&tweet.format=detailed&user.format=detailed`,
    auth: {
      bearer: token,
    },
    headers: {
      'User-Agent': 'TwitterDevSampledStreamQuickStartJS',
    },
    timeout: 20000,
  };

  const twitterStream = request.get(config);
  stream = twitterStream;

  twitterStream
    .on('data', data => {
      try {
        const tweet = JSON.parse(data);
        if(tweet.data.geo){
          socket.emit('new-tweet', tweet);
          fs.writeFile('tweets.log', data, { flag : 'a'}, function() {
            console.log("Logging tweets...");
          });
        }
      } catch (e) {
        // Keep alive signal received. Do nothing.
      }
    })
    .on('error', error => {
      if (error.code === 'ETIMEDOUT') {
        stream.emit('timeout');
      }
    });

  return stream;
}


function StreamingService () {
  try {
    const auth = {
      consumer_key: twitterConfig.CONSUMER_KEY,
      consumer_secret: twitterConfig.CONSUMER_SECRET
    };
    bearerToken(auth).then(data => token = data);
  } catch (e) {
    token = e;
  }
}

StreamingService.prototype.start = function (socket) {
  if(!(token instanceof Error)) {
    streamConnect(token, socket);
  }
}

StreamingService.prototype.stop = function () {
  if(stream) {
    stream.abort();
  }
}

module.exports = StreamingService;