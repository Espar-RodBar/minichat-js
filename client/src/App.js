// import Title from './components/Title.js'
// import Footer from './components/Footer.js'
import { useState } from 'react'
import './style.css'

const APP_STATUS = {
  USER_NOT_LOGGED: 'user_not_logged',
  USER_TO_SIGNIN: 'user_to_signin',
  USER_TO_REGISTER: 'user_to_register',
  USER_LOGGED: 'user_logged',
}

function App() {
  const [appStatus, setAppStatus] = useState(APP_STATUS.USER_NOT_LOGGED)
  return (
    <>
      <Title status={appStatus} />
      {appStatus === APP_STATUS.USER_NOT_LOGGED && (
        <MainScreen setStatus={setAppStatus} />
      )}
      {appStatus === APP_STATUS.USER_TO_SIGNIN && (
        <LoginScreen setStatus={setAppStatus} />
      )}
      {appStatus === APP_STATUS.USER_TO_REGISTER && (
        <RegistryScreen setStatus={setAppStatus} />
      )}
      {appStatus === APP_STATUS.USER_LOGGED && <ChatRoom />}
      <Footer />
    </>
  )
}

function Title({ status }) {
  let subTitle = ''
  if (status === APP_STATUS.USER_NOT_LOGGED)
    subTitle = 'App powered with NodeJS and React!'
  else if (status === APP_STATUS.USER_TO_REGISTER) subTitle = 'Register'
  else if (status === APP_STATUS.USER_TO_SIGNIN) subTitle = 'Signin'
  else if (status === APP_STATUS.USER_LOGGED) subTitle = 'Chatroom'

  return (
    <header className='header'>
      <h1>MiniChatJS</h1>
      <p>{subTitle}</p>
    </header>
  )
}

function MainScreen({ setStatus }) {
  const handlerToLogin = () => setStatus(APP_STATUS.USER_TO_SIGNIN)
  const handlerToRegister = () => setStatus(APP_STATUS.USER_TO_REGISTER)

  return (
    <>
      <h2>Welcome to ChatJS</h2>
      <p>To use the chat, first signup or login with 'Anonymous' to try it!</p>
      <div className='button_container'>
        <ToBtn onClick={handlerToLogin}>to Login</ToBtn>
        <ToBtn onClick={handlerToRegister}>to Registry</ToBtn>
      </div>
    </>
  )
}

function LoginScreen({ setStatus }) {
  const handlerToRegister = () => setStatus(APP_STATUS.USER_TO_REGISTER)
  return (
    <>
      <form class='login_form' method='POST'>
        <div class='login_container'>
          <div class='user_name_wrapper user_wrapper'>
            <label for='userName'>User name:</label>
            <input
              type='text'
              id='input_user_name'
              class='input_user_name'
              name='userName'
              required
            />
          </div>
          <div class='user_pin_wrapper user_wrapper'>
            <label for='userPin'>Pin:</label>
            <input
              type='text'
              id='input_user_pin'
              class='input_user_pin'
              name='password'
            />
          </div>
          <input
            type='submit'
            class='button_green'
            id='login_btn'
            value='login'
          />
        </div>
        <div class='error'></div>
      </form>
      <p className='center_text'>if you haven't got an user, go to</p>
      <div className='button_container'>
        <ToBtn onClick={handlerToRegister}>to Registry</ToBtn>
      </div>
    </>
  )
}

function RegistryScreen({ setStatus }) {
  const handlerToSignin = () => setStatus(APP_STATUS.USER_TO_SIGNIN)
  return (
    <>
      <form class='login_form' method='POST'>
        <div class='login_container'>
          <div class='user_name_wrapper user_wrapper'>
            <label for='userName'>User name:</label>
            <input
              type='text'
              id='input_user_name'
              class='input_user_name'
              name='userName'
              required
            />
          </div>
          <div class='user_pin_wrapper user_wrapper'>
            <label for='userPin'>Pin:</label>
            <input
              type='text'
              id='input_user_pin'
              class='input_user_pin'
              name='password'
            />
          </div>
          <input
            type='submit'
            class='button_green'
            id='login_btn'
            value='login'
          />
        </div>
        <div class='error'></div>
      </form>
      <p className='center_text'>if you have got an user, go to</p>
      <div className='button_container'>
        <ToBtn onClick={handlerToSignin}>to Signin</ToBtn>
      </div>
    </>
  )
}

function ChatRoom() {
  return (
    <>
      <form class='addMsg' id='addMsg_form' method='POST'>
        <div class='message_wrapper'>
          <input type='text' id='input-message' name='message' />
          <input type='submit' class='button_green' id='msgButton' />
        </div>
      </form>

      <div class='text_whiteboard'></div>
    </>
  )
}

function ToBtn({ onClick, children }) {
  return (
    <button class='register_btn' onClick={() => onClick()}>
      {children}
    </button>
  )
}

function Footer() {
  return <footer className='footer'></footer>
}

export default App
