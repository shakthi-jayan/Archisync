import express from 'express'
import { addUser,deleteUser,findOneUser,findUsers, updateUser, updateUserRole } from '../controllers/userController.js'
import { authenticateUser, authorizeAdmin } from '../middleware/authMiddleware.js'

const userRouter = express.Router()

userRouter.post('/addUser',addUser)
userRouter.get('/',findUsers)
userRouter.get('/:id',findOneUser)
userRouter.put('/:id',updateUser)
userRouter.delete('/:id',deleteUser)
userRouter.put('/:id/role',authenticateUser,authorizeAdmin,updateUserRole)

export default userRouter
