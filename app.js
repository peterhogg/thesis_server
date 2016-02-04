// Setup basic express server
var express = require('express');
var app = express();
app.use(express.static('public'));
var server = require('http').createServer(app);
var port = process.env.PORT || 5000
var io = require('socket.io')(server);
server.listen(port,'0.0.0.0');

console.log("App is running at port " + port);

//Holds all the activated topics
var topics = {};

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.get('/report', function (req, res) {
  res.json(topics);
  res.end();
});
app.get('/clear', function (req, res) {
	topics = {}
  res.write("Topics Cleared");
  res.end();
});



io.on('connection', function(socket){
	console.log('Socket Connected');
	socket.on("topic" ,function(data){
		console.log(data)
		var topic = data.name;
		if(topics[topic] == undefined){
			topics[topic] = {understand:0,likes:0}
			io.emit("topic", data);	
		}
		
	});
	socket.on("recevied",function(data){
		io.emit("fromPhone",{"message":"recevied"})
	});
	socket.on("understand",function(data){
		var topic = data.name;
		topics[topic].understand ++;
	});
	socket.on("like",function(data){
		var topic = data.name;
		topics[topic].likes ++;
	});
});
