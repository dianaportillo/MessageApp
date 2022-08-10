require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const expsesh = require('express-session');
const app = require("express")();
const server = require('http').Server(app);

const next = require("next");
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();
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
   getRoomUsers,
} = require('./utils/users');
const { param } = require('./controllers/homepageController');

nextApp.prepare().then() => {
   app.get("*", (reg, res) => {
      return nextHandler(req, res);
   });

   server.listen(PORT, (err)) => {
      if (err) {
         console.log("Invalid");
         console.log(err)
      }
   }
   console.log('Ready on port http:localhost:${PORT}');
};

const io = require('socket.io')(server);

io.on('connect', (socket) => {
   const {
      JOIN_ROOM,
      CHAT_MESSAGE,
      ROOM_USERS,
      DISCONNECT,
   } = SOCKET_EVENTS;
})

socket.on(JOIN_ROOM), ({ username, room }) => {
   socket.join(rom);
   addUser(socket.id, username, room);

   socket.emit(
      CHAT_MESSAGE,
      new TextMessage(
         "CHAT_BOT",
         'Welcome to Anomly ${username}!',
         Message.BOT
      )
   );

   socket.broadcast
      .to(room)
      .emit(
         CHAT_MESSAGE,
         new TextMessage(
            "CHAT_BOT",
            '${username} has joined the room',
            Message.BOT
         )
      );

   io.to(room).emit(ROOM_USERS, {
      room: room,
      users: getRoomUsers(room),
   });
};

@param { SOCKET_EVENTS } CHAT_MESSAGE
@param { Message }

socket.on(CHAT_MESSAGE, (message) => {
   var cur_user = getCurrentUser(socket.id);
   const { room } = cur_user;
   io.to(room).emit(CHAT_MESSAGE, message)
});

socket.on( DISCONNECT, () => {
const cur_user = getCurrentUser(socket.id);
})
   if (cur_user) {
      const { id, username, room } = cur_user;
      io.to(room).emit(
         CHAT_MESSAGE,
         new TextMessage(
            "CHAT_BOT",
            '${username}',
             has left the room',
         Message.BOT
         )
      );

      removeUser(id);
      io.to(room).emit(ROOM_USERS, {
         room: room,
         users: getRoomUsers(room),
      });
   }





   // template engine setup
   app.engine('handlebars', hbs.engine);
   app.set('view engine', 'handlebars');

   app.use(express.static('public'));

   app.use(expsesh(sessionSettings));

   // middlewares
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));

   app.use(routes);


   sequelize.sync({ force: false }).then(() => {
      app.listen(PORT, () => console.log('WE MADE IT'));
   });
