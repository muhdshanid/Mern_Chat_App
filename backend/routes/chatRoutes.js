import express from 'express'
import { accessChat, addToGroup, createGroupChat, fetchChats, removeFromGroup, renameGroup } from '../controllers/chatController.js'
import { protect } from '../middlewares/authMiddleware.js'

const chatRouter = express.Router()

chatRouter.post("/",protect,accessChat)
 chatRouter.get("/",protect,fetchChats)
chatRouter.post("/group",protect,createGroupChat)
chatRouter.put("/rename",protect,renameGroup)
chatRouter.put("/groupremove",protect,removeFromGroup)
chatRouter.put("/groupadd",protect,addToGroup)

 
export default chatRouter