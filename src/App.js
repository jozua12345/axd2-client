import Home from './screens/Home'
import Chat from './screens/Chat'
import { useState } from 'react'
import { io } from 'socket.io-client'

function App() {
  const [home, setHome] = useState(true)
  const [name, setName] = useState("")
  const [socket, setSocket] = useState(undefined)
  const { REACT_APP_SERVER_URL } = process.env

  const onLetsGo = () => {
    const _name = prompt('Please enter a name')
    setName(_name)

    const _socket = io('asdsa', {
      query: {
        'name': _name
      }
    })
    console.log(_socket)
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
