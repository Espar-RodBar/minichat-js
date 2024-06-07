import { useState } from 'react'
import ToBtn from './ToBtn'

const APP_STATUS = {
  USER_NOT_LOGGED: 'user_not_logged',
  USER_TO_SIGNIN: 'user_to_signin',
  USER_TO_REGISTER: 'user_to_register',
  USER_LOGGED: 'user_logged',
}

const baseUrl = window.location.origin

export default function RegistryScreen({ setStatus }) {
  const [inputName, setInputName] = useState('Anonymous')
  const [inputPassword, setInputPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handlerToSignin = () => setStatus(APP_STATUS.USER_TO_SIGNIN)

  async function handlerSignup(e) {
    e.preventDefault()

    const response = await fetch(`${baseUrl}/api/user/signup`, {
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
      setErrorMsg(``)
      handlerToSignin()
    }
  }
  return (
    <>
      <form className='login_form' method='POST' onSubmit={handlerSignup}>
        <div className='login_container'>
          <div className='user_name_wrapper user_wrapper'>
            <label htmlFor='input_user_name'>User name:</label>
            <input
              type='text'
              id='input_user_name'
              className='input_user_name'
              name='userName'
              required
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
          </div>
          <div className='user_pin_wrapper user_wrapper'>
            <label htmlFor='input_user_pin'>Pin:</label>
            <input
              type='text'
              id='input_user_pin'
              className='input_user_pin'
              name='userPin'
              value={inputPassword}
              onChange={setInputPassword}
            />
          </div>
          <button type='submit' className='button_green' id='login_btn'>
            signup
          </button>
        </div>
        <div className='error'>{errorMsg}</div>
      </form>
      <p className='center_text'>if you have got an user, go to</p>
      <div className='button_container'>
        <ToBtn onClick={handlerToSignin}>to Signin</ToBtn>
      </div>
    </>
  )
}
