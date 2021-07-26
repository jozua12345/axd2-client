import Home from './screens/Home'
import Chat from './screens/Chat'
import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

function App() {
  const [home, setHome] = useState(true)
  const [name, setName] = useState("")
  const [socket, setSocket] = useState(undefined)
  const { REACT_APP_SERVER_URL } = process.env

  const onLetsGo = () => {
    const _name = prompt('Please enter a name')
    setName(_name)
    console.log(REACT_APP_SERVER_URL)
    const _socket = io(REACT_APP_SERVER_URL, {
      query: {
        'name': _name
      }
    })
    setSocket(_socket)
    setHome(false)
  }


  return (
    <div>
      {home ? 
        <Home
          onClick = {onLetsGo}
        /> : 
        <Chat
          name = {name}
          socket = {socket}
        />}
    </div>
  );
}

export default App;
