
import './App.css';
import React, { useState, useEffect } from 'react';
import Listener from './Listener';




function App() {

const [post,SetPost] = useState([])

//console.log(`Post  ${post.data.data}`)
    return <div>
        <Listener SetPost={SetPost} />
    </div>
}

export default App;
