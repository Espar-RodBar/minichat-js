const APP_STATUS = {
  USER_NOT_LOGGED: 'user_not_logged',
  USER_TO_SIGNIN: 'user_to_signin',
  USER_TO_REGISTER: 'user_to_register',
  USER_LOGGED: 'user_logged',
}
const baseUrl = window.location.origin

export default function UserLogout({ userName, setUser, setStatus }) {
  const handlerLogout = async function (e) {
    try {
      const response = await fetch(`${baseUrl}/api/user/logout`, {
        method: 'GET',
        mode: 'cors',
      })

      const data = await response.json()
      console.log(data)
      if (data.status === 'success') {
        setStatus(APP_STATUS.USER_NOT_LOGGED)
        setUser(null)
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
