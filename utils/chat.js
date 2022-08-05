const dayjs = require ('dayjs');

class Chat {
    constructor(username, type) {
        this.user = username;
        this.time = dayjs(new Date());
        this.type = type;
    }
}

class TextChat extends Chat {
    constructor(username, chatMessage, type) {
        super(username, type);
        this.chatMessage = chatMessage;
    }
}

class FileChat extends Chat {
    constructor(username, fileUrl, fileName, type) {
        this.fileUrl = fileUrl;
        this.fileName = fileName;
    }
}


Chat.TEXT = 'text';
Chat.BOT = 'bot';
Chat.IMAGE = 'image';
Chat.VIDEO = 'video';
Chat.FILE = 'file';
Chat.OTHER = 'other';

module.exports = {
    Chat,
    TextChat,
    FileChat,
};