// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 5000
var io = require('socket.io')(port);


app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('Socket Connected');
	socket.emit("newVote",{});
	socket.on("vote" ,function(data){
    	console.log('Vote message received');
	});

    
});