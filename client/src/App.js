import { useCookies } from 'react-cookie'
import { io } from 'https://cdn.socket.io/4.7.4/socket.io.esm.min.js'

import { useEffect, useState } from 'react'
import './style.css'

import Title from './components/Title.js'
import Footer from './components/Footer.js'
import UserLogout from './components/UserLogOut.js'
import LoginScreen from './components/LoginScreen.js'
import RegistryScreen from './components/RegistryScreen.js'
import MainScreen from './components/MainScreen.js'

const APP_STATUS = {
  USER_NOT_LOGGED: 'user_not_logged',
  USER_TO_SIGNIN: 'user_to_signin',
  USER_TO_REGISTER: 'user_to_register',
  USER_LOGGED: 'user_logged',
}

// const baseUrl = window.location.origin
const baseUrl = 'http://localhost:3000'

function App() {
  const [appStatus, setAppStatus] = useState(APP_STATUS.USER_NOT_LOGGED)
  const [cookies, setCookies] = useCookies(['jwt'])
  const [userLogged, setUserLogged] = useState(null)

  function handlerAuthtoken(token) {
    setCookies('jwt', token)
  }
  return (
    <>
      <Title status={appStatus} />
      {appStatus === APP_STATUS.USER_LOGGED && (
        <UserLogout userName={userLogged} setStatus={setAppStatus} />
      )}
      {appStatus === APP_STATUS.USER_NOT_LOGGED && (
        <MainScreen setStatus={setAppStatus} />
      )}
      {appStatus === APP_STATUS.USER_TO_SIGNIN && (
        <LoginScreen
          setStatus={setAppStatus}
          setAuthCookies={handlerAuthtoken}
          setUser={setUserLogged}
        />
      )}
      {appStatus === APP_STATUS.USER_TO_REGISTER && (
        <RegistryScreen setStatus={setAppStatus} />
      )}
      {appStatus === APP_STATUS.USER_LOGGED && <ChatRoom />}
      <Footer />
    </>
  )
}

// import { useEffect } from 'react'
function ChatRoom() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)
  const [msg, setMsg] = useState('')

  const socket = io()

  const [isConnected, setIsconnected] = useState(socket.connected)

  function handlerSendMessage(e) {
    e.preventDefault()
    if (msg) {
      socket.emit('client message', msg)
      console.log('mensaje enviado ', msg)
    }
    setMsg('')
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
    socket.on('connect', () => setIsconnected(true))
    socket.on('disconnect', () => setIsconnected(false))
    socket.on('server message', (msg) =>
      console.log('message from server', msg)
    )
    return () => {
      socket.off('connect', () => setIsconnected(true))
      socket.off('disconnect', () => setIsconnected(false))
      socket.off('server message', (msg) =>
        console.log('message from server', msg)
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

function LineMessage({ text, user, likes }) {
  return (
    <p className='message'>
      <span className='message_user'>{user}:</span>
      <span className='message_text'>{text}</span>
      <span className='message_likes'>{likes}</span>
    </p>
  )
}

export default App
