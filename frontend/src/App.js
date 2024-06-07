import { useCookies } from 'react-cookie'

import { useState } from 'react'
import './style.css'

import Title from './components/Title.js'
import Footer from './components/Footer.js'
import UserLogout from './components/UserLogOut.js'
import LoginScreen from './components/LoginScreen.js'
import RegistryScreen from './components/RegistryScreen.js'
import MainScreen from './components/MainScreen.js'
import ChatRoom from './components/ChatRoom.js'

const APP_STATUS = {
  USER_NOT_LOGGED: 'user_not_logged',
  USER_TO_SIGNIN: 'user_to_signin',
  USER_TO_REGISTER: 'user_to_register',
  USER_LOGGED: 'user_logged',
}

function App() {
  const [appStatus, setAppStatus] = useState(APP_STATUS.USER_NOT_LOGGED)
  const [cookies, setCookies] = useCookies(['jwt'])
  const [userLogged, setUserLogged] = useState(null)

  function handlerAuthtoken(token) {
    setCookies('jwt', token)
  }
  return (
    <>
      <Title status={appStatus} jwt={cookies.jwt} />
      {appStatus === APP_STATUS.USER_LOGGED && (
        <UserLogout
          userName={userLogged}
          setStatus={setAppStatus}
          setUserLogged={setUserLogged}
        />
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

export default App
