const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
require('dotenv').config();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        method: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log("user Connected");

    socket.on("message", (data) => {
        console.log(data);
    })
})

server.listen(process.env.PORT, () => {
    console.log("server is live")
})