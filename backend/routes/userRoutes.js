import express from 'express'
import { addUser,findOneUser,findUsers } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/addUser',addUser)
userRouter.get('/',findUsers)
userRouter.get('/:id',findOneUser)

export default userRouter
