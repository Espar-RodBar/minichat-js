//setInterval(() => location.reload(), 50000);

const likeEls = document.querySelectorAll('.message_likes')
const addMsgForm = document.querySelector('.addMsg')
const inputForm = document.querySelector('#input-message')

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

Array.from(likeEls).forEach((el) => el.addEventListener('click', addLike))
