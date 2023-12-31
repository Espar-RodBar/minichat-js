const express = require("express");
const ejs = require("ejs");
const fs = require("fs");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;

const dotenv = require("dotenv");
const result = dotenv.config();
const PORT = process.env.PORT || "2121";

if (result.error) console.log("error loading environment var");

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = "ClusterChatJS";

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
        console.log(`Connected to db ${dbName} Database `);
        db = client.db(dbName);
        const messageBoard = db.collection("messages");
        const users = db.collection("users");
        let user_error_message = "";

        app.listen(PORT, () => {
            console.log("Server is listening on port: " + PORT);
        });

        app.get("/", async (req, res) => {
            messageBoard
                .find()
                .toArray()
                .then((messages) => {
                    res.render("index.ejs", { messages });
                })
                .catch((error) => console.log(error));
        });

        app.get("/login", async (req, res) => {
            res.render("login.ejs");
        });

        app.post("/login", (req, res) => {
            const { user, pin } = req.body;
            users
                .findOne({ name: user, pin })
                .then((result) => console.log("user found"))
                .catch((err) => console.log("login error: ", err));
            res.redirect("/");
        });

        app.get("/register", async (req, res) => {
            user_error_message = "";
            res.render("register.ejs", { user_error_message });
        });

        app.post("/register_user", (req, res) => {
            const { userName, userPin, userConfirmationPin } = req.body;

            if (userPin !== userConfirmationPin) {
                user_error_message = "pin doesn't match";
                res.render("register.ejs", { user_error_message });
            } else {
                const user = {
                    id: idGenerator(),
                    name: userName,
                    pin: userPin,
                };
                users.insertOne(user).then((result) => console.log(result));
                res.render("login.ejs");
            }
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

        // TODO: Add edit msg function

        // end TODO

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
