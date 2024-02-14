import { io } from 'https://cdn.socket.io/4.7.4/socket.io.esm.min.js'
const socket = io()

function sendMessage(e) {
  e.preventDefault()
  const msg = inputForm.value
  if (msg) {
    socket.emit('chat message', msg)
  }
  inputForm.value = ''
}

addMsgForm.addEventListener('submit', sendMessage)

socket.on('chat message', (msg) => {
  console.log(msg)
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
