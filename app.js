// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(5000);

io.on('connection', function(req, res){
    console.log('connection established');
});

setInterval(function(){ 
    io.emit("newVote", {});    
}, 5000);