require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const expsesh = require('express-session');
const app = require("express")();
const server = require('http').Server(app);


const SequelizeStore = require('connect-session-sequelize')(expsesh.Store);
const sequelize = require('./config/connection');
const routes = require('./controllers/homepageController');

const helpers = require('./utils/helpers');

const hbs = exphbs.create({
   helpers,
});

const sessionSettings = {
   secret: process.env.SESSION_SECRET,
   resave: false,

   saveUnitialized: false,
   store: new SequelizeStore({
      db: sequelize,
   }),
};


const PORT = process.env.PORT || 3302;







// template engine setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(expsesh(sessionSettings));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);


const socket = require('socket.io');


const Server = app.listen(PORT, () => {
   console.log(`Server Running on port ${PORT}`)
});
<<<<<<< HEAD
=======

app.post('/room', (req, res) => {
   roomname = req.body.roomname;
   username = req.body.username;
   res.redirect(`/room?username=${username}&roomname=${roomname}`)
});

app.get('/room', (req, res) => {
   res.render('room')
});

const io = socket(Server);
require('./utils/socket')(io);
>>>>>>> 8a10296865452947800ce2b62f85a4620e11eb21
