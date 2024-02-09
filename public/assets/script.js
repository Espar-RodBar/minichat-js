import { io } from 'https://cdn.socket.io/4.7.4/socket.io.esm.min.js'
//setInterval(() => location.reload(), 50000);

const editBtnEls = document.querySelectorAll('.message_edit')
const deleteTextEls = document.querySelectorAll('.message_delete')
const likeEls = document.querySelectorAll('.message_likes')
const closeModalWindowBtnEl = document.querySelector('.quit_modal_btn')
const overlayContainer = document.querySelector('.overlay')
const addMsgForm = document.querySelector('.addMsg')
const inputForm = document.querySelector('#input-message')

const socket = io()

const activateEditMessage = () => {
  openModalWindow()
}

const openModalWindow = () => {
  setTimeout(
    (className) => {
      overlayContainer.classList.remove(className)
      setTimeout(
        (className) => {
          overlayContainer.classList.add(className)
        },
        100,
        'visible'
      )
    },
    0,
    'no_display'
  )
}

const closeModalWindow = () => {
  setTimeout(
    (className) => {
      overlayContainer.classList.remove(className)
      setTimeout(
        (className) => {
          overlayContainer.classList.add(className)
        },
        700,
        'no_display'
      )
    },
    0,
    'visible'
  )
}

function sendMessage(e) {
  e.preventDefault()
  const msg = inputForm.value
  if (msg) {
    socket.emit('chat message', msg)
  }
  inputForm.value = ''
}

async function addLike() {
  const messageId = this.parentNode.dataset.messageId
  try {
    const response = await fetch('addOneLike', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: messageId }),
    })
    const data = await response.json()

    location.reload()
  } catch {
    ;(err) => console.log(err)
  }
}

async function deleteMsg() {
  const messageId = this.parentNode.dataset.messageId
  console.log('erasing...' + messageId)
  try {
    const response = await fetch('deleteMsg', {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: messageId }),
    })

    const data = await response.json()

    location.reload()
  } catch {
    ;(err) => console.log(err)
  }
}

addMsgForm.addEventListener('submit', sendMessage)

Array.from(editBtnEls).forEach((btn) => {
  btn.addEventListener('click', activateEditMessage)
})

Array.from(deleteTextEls).forEach((el) =>
  el.addEventListener('click', deleteMsg)
)
Array.from(likeEls).forEach((el) => el.addEventListener('click', addLike))

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

//Close modal window
closeModalWindowBtnEl.addEventListener('click', closeModalWindow)
