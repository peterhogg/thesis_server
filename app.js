// Setup basic express server
var express = require('express');
var app = express();
app.use(express.static('public'));
var server = require('http').createServer(app);
var port = process.env.PORT || 5000
var io = require('socket.io')(server);
var uuid = require('node-uuid');
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

  //Assing UUID to new connection
  var id = uuid.v4()
  socket.id = id;
  socket.emit("id",{id:id});


	socket.on("topic" ,function(data){
		var topic = data.name;
		if(topics[topic] == undefined){
			topics[topic] = {understand:{},likes:{}}
		}
		io.emit("topic", data);

	});
	socket.on("recevied",function(data){
		io.emit("fromPhone",{"message":"recevied"})
	});
	socket.on("understand",function(data){
		var topic = data.name;
    var id = data.id;
		topics[topic].understand[id]=true;
	});
	socket.on("like",function(data){
		var topic = data.name;
    var id = data.id;
		topics[topic].likes[id]=true;
	});
});
