# Minichat-JS

with this app you can chat with your friends, family, or whatever you want! Use tne anonymous account or just create and user and go!
**Link to project:** http://

![alt tag](http://placecorgi.com/1200/650)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, NodeJS

The app is written with vanilla Javascript on the frontend, and uses Node at the backend with mongodb for the persistence of users and chat history.

Several packets are used:
bcrypt for encrypting the passwords, jsonwebtoken and cookie-parser for auth the user, and socket.io for the chat's' websocket.

## Optimizations

As a MVP project a more robust error handling can be implemented.
For the frontend, is used just ejs, a nice option could be the use of react.
Another fancy thing could be implement a user profile with an avatar, and more information about the user.

## Lessons Learned:

In a first moment, i built this app as a rest api, without sockets, and realoading the chat after some seconds. The use of websockets transformed this project in a real chat, sending and receiving data as you go.

The creating of an authentication system, with users, hashing the password for security, creating protected routes, and adding persitence on the client, with a authentication token and a cookie while catching possible errors.

## TODO:

- Implement a like function for every message.
