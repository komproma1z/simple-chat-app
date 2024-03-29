const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

let users = [];

// Used for sending new members allocation every time someone changes channel
let roomUsers = [];

io.on('connection', socket => {
    socket.on('message', msg => {
        io.emit('message', msg);
    });
    socket.on('roomChange', user => {
        roomUsers = [...roomUsers.filter(u => u.name !== user.name), user];
        // Line 13: leaves all members that were in a room prior to a new one joined and pushes that new one to the array then passes it to client
        io.emit('roomChange', roomUsers);
    });
    socket.on('newLogin', user => {
        users = [...users, user];
    });
    socket.on('requestUsers', _ => {
        console.log(users);
        io.emit('receiveUsers', users);
    });
    
})

http.listen(3001, () => {
    console.log('listening on 3001')
});