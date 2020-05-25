const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const TwitterStream = require('./twitter-streaming');

const twitterStreaming = new TwitterStream();

app.use('/',express.static(path.join(__dirname, '..','public')));

io.on('connection', function (socket){

  twitterStreaming.start(socket);

  socket.on('disconnect', function() {
    twitterStreaming.stop();
  });

});

http.listen(7777, function() {
  console.log("Listening on port 7777")
});