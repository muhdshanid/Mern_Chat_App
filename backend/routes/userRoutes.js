import express from 'express'
import { allUsers, authUser, registerUser } from '../controllers/userController.js'
import { protect } from '../middlewares/authMiddleware.js'

const userRouter = express.Router()

userRouter.post("/",registerUser)
userRouter.post("/login",authUser)
userRouter.get("/",protect ,allUsers)

export default userRouter