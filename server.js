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

const app = express();
app.use(cors());
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const idGenerator = () => Math.floor(Math.random() * 100000);

// let messageBoard = [];
// user format
// const user = {
//     id: "0",
//     name: "Espar",
//     pin: "0000",
// };

// message format
// const message = {
//     _id: "0",
//     userId: "0",
//     userName: "Espar",
//     text: "ola k ase?",
//     likes: 0,
// };

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then((client) => {
        console.log(`Connected to db ${dbName} Database`);
        db = client.db(dbName);
        const messageBoard = db.collection("messages");

        app.listen("8000", () => {
            console.log("Server is listening on port: " + 8000);
        });

        app.get("/", (req, res) => {
            db.collection("messages")
                .find()
                .toArray()
                .then((messages) => {
                    res.render("index.ejs", { messages });
                });
        });

        app.post("/addMsg", (req, res) => {
            const newId = idGenerator();
            const msg = {
                id: newId,
                userId: "0",
                userName: req.body.userName,
                text: req.body.message,
                likes: 0,
            };
            messageBoard.insertOne(msg).then((result) => console.log(result));

            res.redirect("/");
        });

        // TODO fix update by id
        app.put("/addOneLike", (req, res) => {
            const messageId = Number(req.body["id"]);

            messageBoard
                .findOne({ id: messageId })
                .then((msg) => {
                    return msg.likes;
                })
                .then((like) => {
                    messageBoard
                        .findOneAndUpdate(
                            { id: messageId },
                            { $set: { likes: like + 1 } }
                        )
                        .then((result) => {
                            res.status(200).json("+1 like");
                        });
                })
                .catch((err) => res.status(500).json(err));
        });

        app.delete("/deleteMsg", (req, res) => {
            const messageId = Number(req.body["id"]);

            console.log("Deleting..." + messageId);

            messageBoard.findOneAndDelete({ id: messageId });

            res.status(200).json("Message deleted");
        });
    })
    .catch((err) => {
        console.log(`Error db connection: ${err}`);
    });
