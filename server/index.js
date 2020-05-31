const path = require('path');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const TwitterStream = require('./services/twitter-stream');
const twitterStream = new TwitterStream();


app.set('port', (process.env.PORT || 7777));

app.use('/',express.static(path.join(__dirname, '..','public')));

io.on('connection', function (socket){
  /**
   * User connected
   */
  io.of('/').emit('userstats', Object.keys(io.sockets.connected || {}).length);
  
  if (Object.keys(io.sockets.connected || {}).length == 1) {
   /**
    * Start connecting to service
    */
    twitterStream.start(io);
  }

  socket.on('disconnect', function() {
    /**
     * User disconnected
     */
    io.of('/').emit('userstats', Object.keys(io.sockets.connected || {}).length);
    
    if(Object.keys(io.sockets.connected || {}).length < 1) {
      /**
       * Disconnect from service
       */
      twitterStream.stop();
    }
  });

});

http.listen(app.get('port'), function() {
  console.log("Listening on port ", app.get('port'))
});
