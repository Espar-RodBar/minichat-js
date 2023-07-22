console.log("page loaded");
setInterval(() => location.reload(), 50000);

const deleteTextEls = document.querySelectorAll(".message_delete");
const likeEls = document.querySelectorAll(".message_likes");

Array.from(deleteTextEls).forEach((el) =>
    el.addEventListener("click", deleteMsg)
);
Array.from(likeEls).forEach((el) => el.addEventListener("click", addLike));

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
