// import 'reflect-metadata';
// import express from 'express';
// const { createServer } = require('node:http');
// const { join } = require('node:path');
// const { Server } = require('socket.io');

// async function startServer() {
//     const app = express();
//     const server = createServer(app);


//     app.get('/', (req, res) => {
//         res.sendFile(join(__dirname, 'index.html'));
//     });

//     const listId = {};
//     const io = new Server(server);
//     io.on('connection', (socket) => {
//         listId[socket.id] = socket;
//         console.log("unfilter", Object.keys(listId))
//         console.log(Object.keys(listId).filter(id => id !== socket.id))
//         socket.on('getAllUsers', () => {
//             socket.emit('list-users', Object.keys(listId).filter(id => id !== socket.id));
//         })
//         socket.on('private message', ({ message, toID }) => {
//             console.log("this is receiver: ", toID);
//             if (listId[toID]) {
//                 listId[toID].emit('private message', { message, from: socket.id });
//             }
//         });

//         socket.on('disconnect', () => {
//             console.log('user disconnected');
//             delete listId[socket.id];

//             io.emit('list-users', Object.keys(listId));
//         });
//     });

//     server.listen(process.env.MANAGE_PORT, () => {
//         console.log('server running at http://localhost:3000');
//     });
// }

