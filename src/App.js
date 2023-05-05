import {useEffect, useState} from 'react'
import './App.css';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3001'); //connection to socket

function App() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("")

  const joinRoom = () => {
    if(room !== ""){
      socket.emit("join_room", room)
    }
  };
  
  const sendMessage = () => {
    socket.emit('send_message', {message, room}); 
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message)
    })
   
  }, [])
  
  return (
    <div className="App">
     <input type="text" placeholder='Room..' onChange={(e) => {
        setRoom(e.target.value)
      }}/>
      <button onClick={joinRoom}>Join Room</button>
     <input type="text" placeholder='message..' onChange={(e) => {
       setMessage(e.target.value)
     }}/>
     <button onClick={sendMessage}>Send Message</button>
     <h1>Message:</h1>
     {messageReceived}
    </div>
  );
}

export default App;
