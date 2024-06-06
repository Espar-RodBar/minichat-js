import { io } from 'https://cdn.socket.io/4.7.4/socket.io.esm.min.js'
const addMsgForm = document.querySelector('.addMsg')
// const likeEls = document.querySelectorAll('.message_likes')
const inputForm = document.querySelector('#input-message')

const baseUrl = window.location.origin
const socket = io()

function sendMessage(e) {
  e.preventDefault()
  const msg = inputForm.value
  if (msg) {
    socket.emit('client message', msg)
  }
  inputForm.value = ''
}

addMsgForm.addEventListener('submit', sendMessage)

// populate chat room
document.addEventListener('DOMContentLoaded', async (e) => {
  try {
    const response = await fetch(`${baseUrl}/api/messages`)
    if (response.ok) {
      const responseParsed = await response.json()
      const { messages } = responseParsed.data

      for (let i = 0; i < messages.length; i++) {
        const htmlMsg = `<p class="message" data-message-id="${messages[i]._id}">
        <span class="message_id">${messages[i].id}</span>
        <span class="message_text">${messages[i].text}</span>
        <span class="message_user">${messages[i].user.userName}</span>
        <span class="message_likes">${messages[i].likes}</span>
        </p>`
        document
          .querySelector('.text_whiteboard')
          .insertAdjacentHTML('beforeend', htmlMsg)
      }
    } else {
      console.log('failed fetching messages', response.status)
      const error = await response.json()
      console.log(error.message)
      // redirect
      window.location.href = baseUrl + '/login'
    }
  } catch (err) {
    console.log('catch error:', err)
  }
})

////////////////////
// socket listening
socket.on('server message', (msg) => {
  const htmlMsg = `<p class="message" data-message-id="${msg._id}">
  <span class="message_id">${msg.id}</span>
  <span class="message_text">${msg.text}</span>
  <span class="message_user"
  >${msg.user.userName}</span
  >
  <span class="message_likes">${msg.likes}</span>
  
  </p>`
  document
    .querySelector('.text_whiteboard')
    .insertAdjacentHTML('beforeend', htmlMsg)
})

const logout = async function (e) {
  try {
    const response = await fetch(`${baseUrl}/api/user/logout`, {
      method: 'GET',
      mode: 'cors',
    })

    const data = await response.json()
    console.log(data)
    if (data.status === 'success') {
      window.location.href = baseUrl + '/'
    }
  } catch (err) {
    console.log('error on logout:', err)
  }
}

const logoutEl = document.querySelector('#logout')

if (logoutEl) {
  logoutEl.addEventListener('click', logout)
}
