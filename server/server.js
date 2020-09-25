const port = process.env.PORT || 3000;
const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const socketServer = require('socket.io')(server);
const publicPath = path.resolve(__dirname, '../public');

module.exports.socketServer = socketServer;
require('./sockets/socketServer');

app.use(cors({origin: 'http://localhost:2210'}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(publicPath));

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    return res.sendFile(path.join(publicPath, 'index.html'), err => {
        if (err) {
            res.status(500).send(err)
        }
    });
});

server.listen(port, err => {
    if (err) throw new Error(err);

    console.log("Server running in port: ", port)
});
