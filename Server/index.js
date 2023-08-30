const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const mongoose = require('mongoose');
const crypto = require('crypto-js');
const schedule = require('node-schedule');
const User  = require('./Schema')
require('dotenv').config();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        method: ["GET", "POST"]
    }
})

mongoose.connect(process.env.MONGO_DB ,{ useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connected to DB")
})




function decrypt(cipherText, key, iv) {
    const decryptedBytes = crypto.AES.decrypt(cipherText, key, { iv: iv });
    return decryptedBytes.toString(crypto.enc.Utf8);
}

let message =[]

io.on('connection', (socket) => {

    socket.on('data', data => {
        console.log("data");
        for (let i = 0; i < data.length; i++) {
            
            let name = decrypt(data[i].name, process.env.security_key, 15);
            let origin = decrypt(data[i].origin, process.env.security_key, 15);
            let destination = decrypt(data[i].destination, process.env.security_key, 15);

            message.push({
                name: name,
                origin: origin,
                destination: destination
            })
            
         
        }

       
        

        // Function to save data every 60 seconds
        function saveData() {
            if (message.length === 0) {
                console.log('No data to save.');
                return;
            }
        
            const usersToSave = message.map(userData => new User(userData));
        
            User.insertMany(usersToSave)
                .then(savedUsers => {
                    console.log('Users saved:', savedUsers);
                })
                .catch(error => {
                    console.error('Error saving users:', error);
                });
        
                message = []; // Clear the accumulated data
        }
        
        // Call the saveData function every 60 seconds
        setInterval(saveData, 60000);

// Schedule data saving after 1 minute
// schedule.scheduleJob(new Date(Date.now() + 60000), saveDataToDB);

       
       // console.log(message)
       socket.emit('hello',message)
    })
    


})



server.listen(process.env.PORT, () => {
    console.log("server is live")
})