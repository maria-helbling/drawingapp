var express = require('express');
var app = express();
var server=require('http').createServer(app);
var io= require('socket.io')(server);

var PORT = process.env.PORT || 8080;
//this will make all the files in the current foler accessible from the web
app.use(express.static(__dirname));
app.get('/',(req, res, next)=>{
    res.sendFile(__dirname + '/index.html')
});

//this row hides debug messages
//io.set('log level', 1);

//Listen for incoming connections from clients
io.on('connection', function(socket){
    console.log('Client connected...')
    //start listening for mouse move events
    //socket.on('mousemove', function(data){
    socket.on('join', function(data){
        //This line sends the event (broadcasts it) to everyone except the original client.
        //socket.broadcast.emit('moving', data);
        console.log(data)
        socket.broadcast.emit('message', 'Hello from server')
    });
});

//the port for our web server
server.listen(PORT);