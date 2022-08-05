module.exports = {
    APP_NAME:'MessageApp',
    Description:'Online forum to chat with friends or a BOT',

SOCKETEVENTS: {
    JOIN_ROOM: 'joinroom',
    CHAT_BOT: 'chatbot',
    CHAT_MESSAGE: 'chatMessage',
    ROOM_USERS: 'roomUsers',
    DISCONNECT: 'disconnet',
},

MIN_USERNAME_LENGTH: 6,

};




module.exports = {
    uppercaseString: (string) => string.toUpperCase(),
};