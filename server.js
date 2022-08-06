require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const expsesh = require('express-session');
const app = express();
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

const { SOCKET_EVENTS } = require("./utils/helpers");
const { Chat, TextChat } = require('./utils/chat');
const {
   addUser,
   getCurrentUser,
   removeUser,
   getRooms,
} = require('./utils/users');


const io = require('socket.io')(server);

io.on('connect', (socket) => {
   const {
      JOIN_ROOM,
      CHAT_MESSAGE,
      ROOM_USERS,
      DISCONNECT
   } = SOCKET_EVENTS;
})


// template engine setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

 app.use(expsesh(sessionSettings));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(routes);


sequelize.sync({ force: false }).then(() => {
   app.listen(PORT, () => console.log('WE MADE IT'));
});

