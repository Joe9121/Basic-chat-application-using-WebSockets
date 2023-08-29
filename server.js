const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app); // Create an HTTP server with the Express app
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'PP2')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'PP2', 'p2.html'));
});

io.on('connection', socket => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('message', message => {
        console.log('message: ' + message);
        // Broadcast the message to everyone
        io.emit('message', message);
    });
});

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
