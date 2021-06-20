const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require('path')
const port = 3000


app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"))
})

app.get('/ytVideo/:id', (req,res) => {
    res.sendFile(path.join(__dirname, "/index.html"))
})

io.on('connection', (socket) => {

    socket.on("joinedRoom", (roomId) => {
        socket.join(roomId)
        if(io.sockets.adapter.rooms.get(roomId).size > 1){
            io.to(roomId).emit("updateNewUser", socket.id)
        }
    })

    socket.on("updateNewUser", (data) => { 
        io.to(data.user).emit('update', data);
    })

    socket.on('event', (data) => {
        io.to(data.room).emit('update', data)
    })
});

server.listen( port , () => {
    console.log("App listening at port " + port)
})