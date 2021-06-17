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
    
    //res.send("welcome to yotube video with id " + req.params.id)
})

io.on('connection', (socket) => {
    
    socket.on('play', (data) => {
        io.emit('play', (data));
    })

    socket.on('pause', (data) => {
        io.emit('pause', (data));
    })
});

server.listen( port , () => {
    console.log("App listening at port " + port)
})