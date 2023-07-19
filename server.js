const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const PORT = "2121";
const dotenv = require("dotenv");
const result = dotenv.config();

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = "ClusterChatJS";

if (result.error) console.log("error loading environment var");

// MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
//     .then((client) => {
//         console.log(`Connected to db ${dbName} Database`);
//         db = client.db(dbName);
//     })
//     .catch((err) => {
//         console.log(`Error db connection: ${err}`);
//     });

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

// user format
// const user = {
//     id: "0",
//     name: "Espar",
//     pin: "0000",
// };

// message format
// const message = {
//     id: "0",
//     userId: "0",
//     userName: "Espar",
//     text: "ola k ase?",
//     likes: 0,
// };

function saveUser(user) {
    const data = JSON.stringify(user);
    fs.writeFile(usersFilePath, data, "utf-8", (err) => console.log(err));
}

function saveMessages(messages) {
    const data = JSON.stringify(messages);

    fs.writeFile(messagesFilePath, data, "utf-8", (err) => {
        if (err) console.log("err writing: ", err);
    });
}

function readMessagesAsync(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) {
                reject(`Error opening file: ${err}`);
            } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

app.listen("8000", () => {
    console.log("Server is listening on port: " + 8000);
});

app.get("/", (req, res) => {
    readMessagesAsync(messagesFilePath)
        .then((msgs) => {
            console.log("board: ", messageBoard);
            console.log("msg: ", msgs);
            messageBoard = msgs;
            res.render("index.ejs", { messages: messageBoard });
        })
        .catch((err) => console.log("err on get", err));
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
