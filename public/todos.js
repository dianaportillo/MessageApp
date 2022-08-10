const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io');
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res. render('room')
});

const PORT = 3300;

const server = app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`)
});

app.post('/room', (req, res) => {
    roomname = req.body.roomname;
    username = req.body.username;
    res.redirect(`/room?username=${username}&roomname=${roomname}`)
});

app.get('/room', (req, res) => {
    res.render('room')
});

const io = socket(server);
require('./utils/socket')(io);