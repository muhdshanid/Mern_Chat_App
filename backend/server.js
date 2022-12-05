import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import userRouter from './routes/userRoutes.js'
import { errorHandler, notFound } from './middlewares/errorMiddlewares.js'
import chatRouter from './routes/chatRoutes.js'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

connectDB()
app.use(cors())
app.use(express.json())
app.use("/api/user",userRouter)
app.use("/api/chat",chatRouter)

app.use(notFound)
app.use(errorHandler)


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})