import '../App.css'
import { useState, useEffect } from 'react'
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
  Avatar,
} from "@chatscope/chat-ui-kit-react"
import avatarIcon from '../assets/avatar.png'
import loadingIcon from '../assets/loading.gif'
import { parseMessage } from '../utils/Communication'
import { STATE, STATE_MESSAGE } from '../utils/Constant'


function Chat(props) {
    const [ foundUser, setFoundUser ] = useState(false)
    const { socket } = props
    const [ messages, setMessages ] = useState([])
    const [ targetId, setTargetId ] = useState("")
    const [ targetName, setTargetName ] = useState("")
    const [ userState, setUserState ] = useState(STATE.CONNECTED)

    const getUserState = () => {
        switch(userState){
            case STATE.CONNECTED:
                return STATE_MESSAGE.CONNECTED
            case STATE.DISCONNECTED:
                return STATE_MESSAGE.DISCONNECTED
            case STATE.TYPING:
                return STATE_MESSAGE.TYPING
            default:
                return STATE_MESSAGE.CONNECTED
        }
    }

    const handleSend = (message:MessageContent<TextContent>) => {
        if (foundUser){
            setMessages([...messages, parseMessage(message, 'outgoing')])
            socket.emit('send', message, targetId)
        }
    }

    const onFocusMessageInput = () => {
        if (foundUser) {
            socket.emit('state', STATE.TYPING, targetId)
        }
    }

    const onBlurMessageInput = () => {
        if (foundUser) {
            socket.emit('state', STATE.CONNECTED, targetId)
        }
    }

    const handlePairing = (target) => {
        setFoundUser(true)
        setTargetId(target._socketId)
        setTargetName(target._name)
    }


    // component did update
    useEffect(() => {
        socket.on('pairing', (target) => {
            handlePairing(target)
        })

        socket.on('receive', (message) => {
            setMessages([...messages, parseMessage(message, 'incoming')])
        })

        socket.on('state', (state) => {
            setUserState(state)
        })
    })

    return (
        <div style={{ position: "relative", height: "100vh" }}>
            <MainContainer>
                <ChatContainer>
                    <ConversationHeader>
                        <Avatar src={foundUser ? avatarIcon : loadingIcon}/>
                        { foundUser ? 
                            <ConversationHeader.Content userName={targetName} info={getUserState()} /> :
                            <ConversationHeader.Content userName="Searching for someone" info="Please wait..." />
                        }
                    </ConversationHeader>
                    <MessageList>
                        { messages.map((message) => (
                             <Message
                                model={message}
                            />
                        ))}
                        
                    </MessageList>
                    <MessageInput 
                        onBlur={onBlurMessageInput} 
                        onFocus={onFocusMessageInput} 
                        attachButton={false} 
                        placeholder="Type message here" 
                        onSend={handleSend}
                    />
                </ChatContainer>
            </MainContainer>
        </div>
        
    );
}

export default Chat;