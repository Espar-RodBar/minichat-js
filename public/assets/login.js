const formEl = document.querySelector('.login_form')
const userNameEl = document.querySelector('.input_user_name')
const passwordEl = document.querySelector('.input_user_pin')
const errorEl = document.querySelector('.error')
const logoutEl = document.querySelector('#logout')

const baseUrl = window.location.origin

const login = async function (e) {
  e.preventDefault()
  const userName = userNameEl.value
  const password = passwordEl.value
  userNameEl.value = passwordEl.value = ''

  console.log('login.js', baseUrl)
  const response = await fetch(`${baseUrl}/api/user/login`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, userName }),
  })

  const data = await response.json()
  console.log('login:', response, data)

  if (data.status === 'fail') {
    errorEl.textContent = data.message
  } else if (data.status === 'success') {
    errorEl.textContent = ''
    window.location.href = baseUrl + '/chatroom'
  }
}

const logout = async function (e) {
  try {
    const response = await fetch(`${baseUrl}/api/user/logout`, {
      method: 'GET',
      mode: 'cors',
    })

    const data = await response.json()
    console.log(data)
    if (data.status === 'success') {
      location.reload(true)
    }
  } catch (err) {
    console.log('error on logout:', err)
  }
}

if (logoutEl) {
  logoutEl.addEventListener('click', logout)
}

formEl.addEventListener('submit', login)
