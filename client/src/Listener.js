
import { useEffect } from "react";
import { io } from "socket.io-client";
import axios from 'axios';

const crypto = require('crypto-js')

const data = require('./data.json');

function encrypt(text, key, iv) {
    const cipherText = crypto.AES.encrypt(text, key, { iv: iv }).toString();
    return cipherText;
}



function random() {
    let nameindex = Math.floor(Math.random() * data.names.length);
    let originindex = Math.floor(Math.random() * data.cities.length);
    let destinationindex = Math.floor(Math.random() * data.cities.length);
    return [nameindex, originindex, destinationindex]
}

export default function Listener({ SetPost }) {

    useEffect(() => {
        sendmessage()
    }, []);

    async function getData() {
        try {
            const response = await axios.get('http://localhost:8080/getpost');
            console.log("response")
            console.log(response.data);
           // SetPost(response.data); 
        } catch (err) {
            console.log(err);
        }
    }


    const socket = io('http://localhost:8080');
    socket.on('connection', () => {
        console.log("connected")
    })
    socket.on('post', () => {
        getData();
       // console.log("postdata")
    })

    let message = [];


    function generatemessage() {


        let index = random()
        let name = encrypt(data.names[index[0]], 'satya', 15);
        let origin = encrypt(data.cities[index[1]], 'satya', 15);
        let destination = encrypt(data.cities[index[2]], 'satya', 15);
        message.push({
            name: name,
            origin: origin,
            destination: destination
        })

        return message
    }

    function sendmessage() {
        const message = generatemessage();
       // console.log(message)
        socket.emit('data', message)
        console.log("message sent")
        setTimeout(sendmessage, 30000)


    }

    /* socket.on('hello', res => {
         console.log(res)
     })*/

}