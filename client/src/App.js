
import './App.css';
import io from 'socket.io-client';
import React, { useState, useEffect } from 'react';
import Listener from './Listener';
const crypto =  require('crypto-js')
// require('dotenv').config()


function encrypt(text, key, iv) {
    const cipherText = crypto.AES.encrypt(text, key, { iv: iv }).toString();
    return cipherText;
  }

  function decrypt(cipherText, key, iv) {
  const decryptedBytes = crypto.AES.decrypt(cipherText, key, { iv: iv });
  return decryptedBytes.toString(crypto.enc.Utf8);
}


function App() {



   /* const socket = io('http://localhost:8080')
    socket.on("connected", data => {
        console.log(data)
    })*/
    





    return <div>
        <Listener/>
    </div>
}

export default App;
