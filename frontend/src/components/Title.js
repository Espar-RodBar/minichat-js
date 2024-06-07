const APP_STATUS = {
  USER_NOT_LOGGED: 'user_not_logged',
  USER_TO_SIGNIN: 'user_to_signin',
  USER_TO_REGISTER: 'user_to_register',
  USER_LOGGED: 'user_logged',
}

export default function Title({ status }) {
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
