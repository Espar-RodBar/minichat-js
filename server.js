const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const usersFilePath = __dirname + "/users.txt";
const messagesFilePath = __dirname + "/messages.txt";

const idGenerator = () => Math.floor(Math.random() * 100000);

let messageBoard = [];

const user = {
    id: "0",
    name: "Espar",
    pin: "0000",
};

const message = {
    id: "0",
    userId: "0",
    userName: "Espar",
    text: "ola k ase?",
    likes: 0,
};

// function to save user data
function saveUser(user) {
    const data = JSON.stringify(user);
    fs.writeFile(usersFilePath, data, "utf-8", (err) => console.log(err));
}

// function to save messages in a file
function saveMessages(messages) {
    const data = JSON.stringify(messages);

    fs.writeFile(messagesFilePath, data, "utf-8", (err) => {
        if (err) console.log("err writing: ", err);
    });
}

app.listen("8000", () => {
    console.log("Server is listening on port: " + 8000);
});

app.get("/", (req, res) => {
    fs.readFile(messagesFilePath, "utf-8", (err, data) => {
        if (err) {
            console.log(`Error opneing file: ${err}`);
        }
        messageBoard = JSON.parse(data);

        res.render("index.ejs", { messages: messageBoard });
    });
});

app.post("/addMsg", (req, res) => {
    const idCounter = idGenerator();

    console.log("creating mesg id: " + idCounter);
    messageBoard.push({
        id: idCounter.toString(),
        userId: "0",
        userName: req.body.userName,
        text: req.body.message,
        likes: 0,
    });

    saveMessages(messageBoard);
    res.redirect("/");
});

app.put("/addOneLike", (req, res) => {
    const messageId = req.body;

    const message = messageBoard.find((message) => message.id === messageId.id);

    message["likes"] = message["likes"] + 1;
    saveMessages(messageBoard);
    res.status(200).json("+1 like");
});

app.delete("/deleteMsg", (req, res) => {
    const messageId = req.body;

    const indexDel = Number(
        messageBoard.findIndex((message) => message.id === messageId.id)
    );

    console.log("Deleting..." + messageId.id + " position in " + indexDel);
    messageBoard.splice(indexDel, 1);
    saveMessages(messageBoard);

    res.status(200).json("Message deleted");
});