const logoutEl = document.querySelector('#logout')
const baseUrl = window.location.origin

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
