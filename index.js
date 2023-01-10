const express=require('express');
const app = express();
const http=require('http');
const cors=require('cors');
const {Server}=require('socket.io');
app.use(cors());


const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:['GET','POST'],

    },
} )




server.listen(3001, ()=>{
    console.log('listening');
})

io.on("connection",(socket)=>{
    console.log(`User id is ${socket.id}`);

    socket.on("join_room",(data)=>{
        socket.join(data);
        
        console.log(`this is User id is ${socket.id} room is ${data}`);
    })
    socket.on("send_msg",(data)=>{
        socket.to(data.room).emit("recived_msg",data)
    });

    socket.on("disconnect",()=>{
        console.log("user disconnected", socket.id);
    });

 
    
})