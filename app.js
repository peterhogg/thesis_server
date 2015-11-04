// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 5000
var io = require('socket.io')(port);

io.on('connection', function(req, res){
    console.log('connection established');
});

setInterval(function(){ 
    io.emit("newVote", {});    
}, 5000);