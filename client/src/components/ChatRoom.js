import { useEffect, useState } from 'react'
import { io } from 'https://cdn.socket.io/4.7.4/socket.io.esm.min.js'

const baseUrl = 'http://localhost:3000'

const socket = io()

export default function ChatRoom() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  const [isConnected, setIsconnected] = useState(socket.connected)

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
    socket.on('connect', () => setIsconnected(true))
    socket.on('disconnect', () => setIsconnected(false))
    socket.on('server message', (msg) => {
      // on a server message, add to the state
      console.log(messages)
      setMessages((ms) => [...ms, msg])
    })
    return () => {
      socket.off('connect', () => setIsconnected(true))
      socket.off('disconnect', () => setIsconnected(false))
      socket.off('server message', (msg) =>
        // on a server message, add to the state
        setMessages((ms) => [...ms, msg])
      )
    }
  }, [])

  return (
    <>
      <p>
        Connected:
        {!isConnected && <span>🔴</span>}
        {isConnected && <span>🟢</span>}
      </p>

      <SendMsg />

      <div className='text_whiteboard'>
        {messages.map((msg) => (
          <LineMessage
            text={msg.text}
            user={msg.user.userName}
            likes={msg.likes}
          />
        ))}
      </div>
    </>
  )
}

function SendMsg() {
  const [msg, setMsg] = useState('')

  function handlerSendMessage(e) {
    e.preventDefault()
    if (msg) {
      socket.emit('client message', msg)
      console.log('mensaje enviado ', msg)
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

function LineMessage({ text, user, likes }) {
  return (
    <p className='message'>
      <span className='message_user'>{user}:</span>
      <span className='message_text'>{text}</span>
      <span className='message_likes'>{likes}</span>
    </p>
  )
}
