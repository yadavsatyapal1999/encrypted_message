
import './App.css';
import React, { useState, useEffect } from 'react';
import Listener from './Listener';




function App() {

const [post,SetPost] = useState([])

console.log("post")
 console.log(post.data)
    return <div>
        <Listener SetPost={SetPost} />
        {post.data != undefined ?<div>
            <ol>
            {post.data.map(detail=>{
                return <li> 
                    <h4>Name :{detail.name}</h4>
                    <h4>Origin :{detail.origin}</h4>
                    <h4>Destination :{detail.destination}</h4>
                  </li>
            })}
            </ol>
        </div>  :<h1>No data recieved yet</h1>}
    </div>
}

export default App;
