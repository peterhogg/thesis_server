// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 5000
var io = require('socket.io')(server);
server.listen(port,'0.0.0.0');

console.log("App is running at port " + port);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('Socket Connected');
	socket.on("new_topic" ,function(data){
		var topic = data.topic;
		console.log(topic);
		io.emit("topicActivated", data);
	});
	socket.on("recevied",function(data){
		io.emit("fromPhone",{"message":"recevied"})
	});
});
