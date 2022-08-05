const onlineUsers = [];

function addUser(id, username,room) {
    const user = { id, username, room};
    onlineUsers.push(user);
}

function getCurrentUser(id) {
    return onlineUsers.find((user) => user.id === id);
}

function removeUser(id) {
    const index = onlineUsers.findIndex((user) => user.id === id);

    if (index!= -1) {
        onlineUsers.splice(index, 1);
    }
}


function getRooms(room) {
    return onlineUsers.filter((user) => user.room === room);
}

module.exports = {
    addUser, 
    getCurrentUser,
    removeUser,
    getRooms
};