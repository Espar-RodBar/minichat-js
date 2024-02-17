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
        const htmlMsg = `<li class="message" data-message-id="${messages[i]._id}">
        <span class="message_id">${messages[i].id}</span>
        <span class="message_text">${messages[i].text}</span>
        <span class="message_user">${messages[i].userName}</span>
        <span class="message_likes">${messages[i].likes}</span>
        </li>`
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
    console.log('catch error')
  }
})

////////////////////
// socket listening
socket.on('server message', (msg) => {
  const htmlMsg = `<li class="message" data-message-id="${msg._id}">
  <span class="message_id">${msg.id}</span>
  <span class="message_text">${msg.text}</span>
  <span class="message_user"
  >${msg.userName}</span
  >
  <span class="message_likes">${msg.likes}</span>
  
  </li>`
  document
    .querySelector('.text_whiteboard')
    .insertAdjacentHTML('beforeend', htmlMsg)
})
