const io=require('socket.io')(8000);


const users={};

io.on('connection',socket =>{
    socket.on('new-user-joined',name=>{
        condole.log("New user ayush srivastav",name);

        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    }); 
    socket.on('send',message=>{
        socket.broadcast.emit('recieve',{message:message, name: users[socket.id]})
    });
})  