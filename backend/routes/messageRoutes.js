import express from 'express'
import { allMessages, sendMessage } from '../controllers/messageController.js'
import { protect } from '../middlewares/authMiddleware.js'

const messageRoutes = express.Router()

messageRoutes.post("/",protect,sendMessage)
messageRoutes.get("/:chatId",protect,allMessages)

export default messageRoutes