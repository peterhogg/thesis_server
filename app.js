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
var topics      = {};
var likes       = {};
var understand  = {};

app.get('/', function (req, res) {
  topics = {};
  likes = {};
  understand = {};
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
			topics[topic] = {understand:{},likes:[]}
		}
    console.log(data)
		io.emit("topic", data);

	});
	socket.on("recevied",function(data){
		io.emit("fromPhone",{"message":"recevied"})
	});
	socket.on("understand",function(data){
    console.log(data);
		var topic = data.name;
    var value = data.value;
    var id = data.id;
    if(understand[topic] == undefined){
      understand[topic]={};
    }
		understand[topic][id]=value;
    io.emit("newUnderstanding",understand);
	});
	socket.on("like",function(data){
    console.log(data);
		var topic = data.name;
    var id = data.id;
    var likeStatus = data.checked;
    if(likes[topic] == undefined){
      likes[topic]={};
    }
    likes[topic][id] = likeStatus;
    console.log("likes" + likes);
    io.emit("newLike",likes);


	});
});
