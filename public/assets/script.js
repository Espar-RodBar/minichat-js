console.log("page loaded");
setInterval(() => location.reload(), 50000);

const editBtnEls = document.querySelectorAll(".message_edit");
const deleteTextEls = document.querySelectorAll(".message_delete");
const likeEls = document.querySelectorAll(".message_likes");

Array.from(editBtnEls).forEach((btn) => {
    btn.addEventListener("click", activateEditMessage);
});

Array.from(deleteTextEls).forEach((el) =>
    el.addEventListener("click", deleteMsg)
);
Array.from(likeEls).forEach((el) => el.addEventListener("click", addLike));

async function activateEditMessage() {
    const overlayContainer = document.querySelector(".overlay");
    console.log(overlayContainer);
    overlayContainer.classList.remove("no_visible", "no_display");
}

//TODO: Close modal window
// end

async function addLike() {
    const messageId = this.parentNode.dataset.messageId;
    try {
        const response = await fetch("addOneLike", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: messageId }),
        });
        const data = await response.json();

        location.reload();
    } catch {
        (err) => console.log(err);
    }
}

async function deleteMsg() {
    const messageId = this.parentNode.dataset.messageId;
    console.log("erasing..." + messageId);
    try {
        const response = await fetch("deleteMsg", {
            method: "delete",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: messageId }),
        });

        const data = await response.json();

        location.reload();
    } catch {
        (err) => console.log(err);
    }
}
