import * as UserService from "../services/userService.js"
import jwt from 'jsonwebtoken'

export const addUser = async (req,res) => {
    try{
      const user = await UserService.createUserService(req.body)
      if(user){
        res.status(201).json({"message" : "User created Successfully", userId : user._id})
      }
    }catch(error){
      if(error.name == "ValidationError"){
        res.status(400).json({"message" : "Invalid Data Provided", error : error.message})
      }
      res.status(500).json({"message" : "Server error", error : error.message})
    }
}

export const findOneUser = async(req,res) =>{
  try{
    const user = await UserService.findOneUserService(req.body)
    if(user){
        res.status(200).json({"message" : "User found", userId : user._id ,"Role" : user.role, "Assigned Projects" : user.assignedProjects})
      }
  }catch(error){
    if(error.name == "ValidationError") res.status(400).json({message : "Invalid Data Provided" , error : error.message})
    res.status(500).json({message : "Server Error" , error : error.message})
  }
}

export const findUsers = async (req, res) => {
  try {
    const users = await UserService.findAllUserService()
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" })
    }
    res.status(200).json({ message: "Users retrieved successfully", count: users.length, data: users })
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

export const updateUser = async(req,res) => {
  const {username , ...update} = req.body
  try{
    const user = await UserService.updateUserService({username},update)
    if (!user) {
      return res.status(404).json({ message: "No users found with that username" })  
    }
    res.status(200).json({ message: "User data updated successfully", data: user })
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await UserService.deleteUserService({ _id: id })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json({ message: "User Deleted successfully", data: user })
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

export const updateUserRole = async(req,res) => {
  const {username , role} = req.body
  try{
    const user = await UserService.updateUserService({username},role)
    if (!user) {
      return res.status(404).json({ message: "No users found with that username" })  
    }
    res.status(200).json({ message: "User data updated successfully", data: user })
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}

export const loginUser = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.findOne({ username }).select('+password')
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" })
    }
    const accessToken = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    )
    res.status(200).json({ message: "Logged in successfully", accessToken })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}
