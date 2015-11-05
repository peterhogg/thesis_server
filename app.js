// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = process.env.PORT || 5000
var io = require('socket.io')(server);
server.listen(port,'0.0.0.0');

//Dummy Data
var pollData = {
	0 : {
		question : "blah blah",
		votes    : 2
	},
	1 : {
		question : "something something",
		votes    : 1
	}
};

console.log("App is running at port " + port);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	console.log('Socket Connected');
	socket.emit("newVote",{"dummy": "data"});
	socket.on("vote" ,function(data){
		pollData =vote(pollData, data.index);
    	console.log('Vote message received');
    	console.log(pollData);
	});
});

//Get the amount of poll questions in the data
function getSize(data){
	return Object.keys(data).length;
}

//Gets the question at an index
function getQuestion(data, index){
	return data[index].question;
}

//Gets the votes at an index
function getVotes(data, index){
	return data[index].votes;
}

//Adds a poll option to the data
function add(data,newQuestion){
	var index = getSize(data);
	data[index] = {
					question : newQuestion,
					votes    : 0
				  };
	return data;
}
//Votes for a question given its index
function vote(data, index){
	votes = getVotes(data,index);
	votes ++;
	data[index].votes = votes;
	return data;
}
