var express = require('express');
var socket = require('socket.io');


// App setup

var app = express();

// Listen to a specific port number
var server = app.listen(4000, function() {
    console.log("Listening to requests on port 4000");
});

//static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

/*  the socket argument in the callback function
*   refers to the socket between the client thats made the connection
*   and the server.
*/
io.on('connection', function (socket) {
    console.log('made socket connection', socket.id);

    // when the socket receives a 'chat' message
    // data = the json with message/handle values
    socket.on('chat', function(data) {
        
        // sockets = all the sockets on the server
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function(data) {
        // socket refers to the socket that sent us the typing event
        socket.broadcast.emit('typing', data);
    });

});


