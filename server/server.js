const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const socketServer = require('socket.io')(server);
const publicPath = path.resolve(__dirname, '../public');

app.use(cors({origin:'http://localhost:2210'}));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(publicPath));

module.exports.socketServer = socketServer;
require('./sockets/socketServer');

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    return res.sendFile(path.join(publicPath, 'index.html'), err => {
        if (err) {
            res.status(500).send(err)
        }
    });
});

app.listen(3000, () => {
    console.log("Server running in port: ", 3000)
});
