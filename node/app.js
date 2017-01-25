var express = require ('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

io.on('connection', function(socket){
 	console.log("socket open");
});

var myPort = new SerialPort("COM5", {
	baudrate: 9600,
	parser: serialport.parsers.readline("\n")
});

myPort.on('open', onOpen);
myPort.on('data', onData);

function onOpen(){
	console.log("Connected to board: Ardunio/Genuino Uno");
}

function onData(data) {
  io.sockets.emit('port', data);
  console.log(data);
}

app.get('/', function(req, res){
res.sendfile(__dirname+'/index.html');
});

server.listen(8080, function(){
	console.log("temp_sensor");
});