import socket from '../socket'

const baseUrl = window.location.origin

const APP_STATUS = {
  USER_NOT_LOGGED: 'user_not_logged',
  USER_TO_SIGNIN: 'user_to_signin',
  USER_TO_REGISTER: 'user_to_register',
  USER_LOGGED: 'user_logged',
}

export default function UserLogout({
  userName,
  setUserLogged,
  setStatus,
  removeCookie,
}) {
  const handlerLogout = async function () {
    try {
      const response = await fetch(`${baseUrl}/api/user/logout`)

      const data = await response.json()

      if (data.status === 'success') {
        setStatus(APP_STATUS.USER_NOT_LOGGED)
        setUserLogged((user) => (user = null))
        removeCookie()
        socket.disconnect()
      }
    } catch (err) {
      console.log('error on logout:', err)
    }
  }
  return (
    <p class='user_name_logout'>
      User name: {userName}
      <span id='logout' class='btn_logout' onClick={handlerLogout}>
        logout
      </span>{' '}
    </p>
  )
}
