// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 5000
var io = require('socket.io')(port);

console.log("App is running at port " + port);

io.on('connection', function(req, res){
	console.log('Socket Connected');
	socket.emit("vote",{"dummy": "data"});
	socket.on("newVote" ,function(data){
    	console.log('Vote message received');
	});

    
});