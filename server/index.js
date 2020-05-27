const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const TwitterStream = require('./twitter-streaming');

const twitterStreaming = new TwitterStream();

app.set('port', (process.env.PORT || 7777));

app.use('/',express.static(path.join(__dirname, '..','public')));

io.on('connection', function (socket){

  twitterStreaming.start(socket);

  socket.on('disconnect', function() {
    twitterStreaming.stop();
  });

});

http.listen(app.get('port'), function() {
  console.log("Listening on port ", app.get('port'))
});
