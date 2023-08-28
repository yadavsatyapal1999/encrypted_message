
import './App.css';
import io from 'socket.io-client';


function App() {
   const socket = io('http://localhost:8080')

    const click = ()=>{
        const message = "hello DB"
        socket.emit('message',message);
    }
 return <div>
  <button onClick={click} >Click to connect</button>
 </div>
}

export default App;
