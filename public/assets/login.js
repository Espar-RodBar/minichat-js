const form = document.querySelector('.login_form')
const userNameEl = document.querySelector('.input_user_name')
const passwordEl = document.querySelector('.input_user_pin')
const errorEl = document.querySelector('.error')

const baseUrl = window.location.origin

console.log(baseUrl)

form.addEventListener('submit', async function (e) {
  e.preventDefault()
  const userName = userNameEl.value
  const password = passwordEl.value
  userNameEl.value = passwordEl.value = ''

  // const userRequest = new Request()
  const response = await fetch(`${baseUrl}/api/user/login`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, userName }),
  })

  const data = await response.json()
  if (data.status === 'fail') {
    errorEl.textContent = data.message
  } else if (data.status === 'success') {
    errorEl.textContent = ''
    window.location.href = baseUrl + '/chatroom'
  }
  console.log(data)
})
