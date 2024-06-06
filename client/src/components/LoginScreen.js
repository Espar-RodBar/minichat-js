import { useState } from 'react'
import ToBtn from './ToBtn'

const APP_STATUS = {
  USER_NOT_LOGGED: 'user_not_logged',
  USER_TO_SIGNIN: 'user_to_signin',
  USER_TO_REGISTER: 'user_to_register',
  USER_LOGGED: 'user_logged',
}

const baseUrl = 'http://localhost:3000'

export default function LoginScreen({ setStatus, setAuthCookies, setUser }) {
  const [inputName, setInputName] = useState('Anonymous')
  const [inputPassword, setInputPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handlerToRegister = () => setStatus(APP_STATUS.USER_TO_REGISTER)

  async function handlerLoginSubmit(e) {
    e.preventDefault()

    console.log('submiting login')
    try {
      // const response = await fetch(`${baseUrl}/api/user/login`, {
      const response = await fetch(`${baseUrl}/api/user/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: inputPassword, userName: inputName }),
      })

      const data = await response.json()

      if (data.status === 'fail') {
        setErrorMsg(data.message)
      } else if (data.status === 'success') {
        setErrorMsg('')
        setAuthCookies(data.token)
        setStatus(APP_STATUS.USER_LOGGED)
        setUser(inputName)
      }
    } catch (err) {
      console.log('error fetching data')
    }
  }
  return (
    <>
      <form className='login_form' method='POST' onSubmit={handlerLoginSubmit}>
        <div className='login_container'>
          <div className='user_name_wrapper user_wrapper'>
            <label htmlFor='userName'>User name:</label>
            <input
              type='text'
              id='input_user_name'
              className='input_user_name'
              name='userName'
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              required
            />
          </div>
          <div className='user_pin_wrapper user_wrapper'>
            <label htmlFor='userPin'>Pin:</label>
            <input
              type='text'
              id='input_user_pin'
              className='input_user_pin'
              name='password'
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
          </div>
          <button className='button_green' id='login_btn'>
            Login
          </button>
        </div>
        <div className='error'>{errorMsg}</div>
      </form>
      <p className='center_text'>if you haven't got an user, go to</p>
      <div className='button_container'>
        <ToBtn onClick={handlerToRegister}>to Registry</ToBtn>
      </div>
    </>
  )
}
