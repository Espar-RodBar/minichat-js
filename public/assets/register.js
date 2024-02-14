const form = document.querySelector('.register_form')
const userNameEl = document.querySelector('.input_user_name')
const passwordEl = document.querySelector('.input_user_pin')
const baseUrl = window.location.origin

console.log(baseUrl)

form.addEventListener('submit', async function (e) {
  e.preventDefault()
  const userName = userNameEl.value
  const password = passwordEl.value

  // const userRequest = new Request()
  const response = await fetch('http://localhost:3000/api/user/signup', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password, userName }),
  })

  console.log(await response.json())
})
