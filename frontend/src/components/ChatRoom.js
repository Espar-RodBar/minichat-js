import { useEffect, useState, useRef } from 'react'
import socket from '../socket'

const baseUrl = window.location.origin

export default function ChatRoom({ userName, children }) {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  // const [scrollPos, setScrollPos] = useState(0)
  // const scrollDiv = useRef(null)

  const [isConnected, setIsconnected] = useState(socket.connected)

  const handlerScroll = (e) => {
    // console.log(scrollDiv.current)
    console.log(e)
  }

  useEffect(() => {
    // 1.- get messages from DB
    setLoading((loading) => (loading = true))

    fetch(`${baseUrl}/api/messages`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('failed fetching messages', res.status)
        }
        return res.json()
      })
      .then((data) => {
        const msgBd = data.data.messages

        //2.- Add msg to the state
        setMessages([...msgBd])
        setError((err) => (err = null))
      })
      .catch((err) => {
        console.log('catch error:', err)
        setError((err) => (err = 'error fetching'))
      })
      .finally(() => {
        setLoading((loading) => (loading = false))
      })

    // 3.- socket
    socket.connect()
    socket.on('connect', function connect() {
      setIsconnected(true)
    })
    socket.on('disconnect', function disconnect() {
      setIsconnected(false)
    })
    socket.on('server message', function serverMsg(msg) {
      // on a server message, add to the state
      setMessages((ms) => [...ms, msg])
    })
    return () => {
      socket.off('connect', function connect() {
        setIsconnected(true)
      })
      socket.off('disconnect', function disconnect() {
        setIsconnected(false)
      })
      socket.off('server message', (msg) =>
        // on a server message, add to the state
        setMessages((ms) => [...ms, msg])
      )
      socket.disconnect()
    }
  }, [])

  return (
    <>
      <p>
        Connected:
        {!isConnected && <span>🔴</span>}
        {isConnected && <span>🟢</span>}
      </p>
      {children}
      <SendMsg />

      <ul className='text_whiteboard' onClick={handlerScroll}>
        {messages.map((msg) => (
          <LineMessage
            text={msg.text}
            textUser={msg.user.userName}
            likes={msg.likes}
            key={msg.id}
            userName={userName}
          />
        ))}
      </ul>
    </>
  )
}

function SendMsg() {
  const [msg, setMsg] = useState('')

  function handlerSendMessage(e) {
    e.preventDefault()
    if (msg) {
      socket.emit('client message', msg)
    }
    setMsg('')
  }
  return (
    <form className='addMsg' id='addMsg_form' method='POST'>
      <div className='message_wrapper'>
        <input
          type='text'
          id='input-message'
          name='message'
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <input
          type='submit'
          className='button_green'
          id='msgButton'
          onClick={handlerSendMessage}
        />
      </div>
    </form>
  )
}

function LineMessage({ text, textUser, likes, userName }) {
  const [msgLikes, setMsgLikes] = useState(likes)

  // TODO: Implement API for likes be persistent
  function handlerSetMsgLikes() {
    setMsgLikes((l) => l + 1)
    console.log(textUser, userName)
  }

  return (
    <li className='message'>
      <span className='message_user'>
        {textUser === userName && userName !== 'Anonymous' ? 'Tu' : textUser}:
      </span>
      <span className='message_text'>{text}</span>
      <span className='message_likes' onClick={handlerSetMsgLikes}>
        {msgLikes}
      </span>
    </li>
  )
}
