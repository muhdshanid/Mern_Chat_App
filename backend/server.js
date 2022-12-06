import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import userRouter from './routes/userRoutes.js'
import { errorHandler, notFound } from './middlewares/errorMiddlewares.js'
import chatRouter from './routes/chatRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

connectDB()
app.use(cors())
app.use(express.json())
app.use("/api/user",userRouter)
app.use("/api/chat",chatRouter)
app.use("/api/message",messageRoutes)

app.use(notFound)
app.use(errorHandler)


 const server = app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
}) 

const io = new Server(server, {
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:3000"
    }
});

io.on("connection", (socket) => {
  console.log("conntected to socket");
  socket.on('setup',(userData)=>{
    socket.join(userData._id)
    socket.emit("connected")
  });

  socket.on("join chat",(roomId) => {
    socket.join(roomId)
    console.log("user joined" + roomId);
  });

  socket.on("typing",(room)=>socket.in(room).emit("typing"))
  socket.on("stop typing",(room)=>socket.in(room).emit("stop typing"))
  
  socket.on("new message",(newMsgReceived)=>{
    var chat = newMsgReceived.chat
    if(!chat.users)return console.log("chat.users not defined");

    chat.users.forEach((user)=>{
        if(user._id === newMsgReceived.sender._id) return 

        socket.in(user._id).emit("message received",newMsgReceived)
    })
  })
});
