import * as UserService from "../services/userService.js";

export const addUser = async (req,res) => {
    try{
      const user = await UserService.createUserService(req.body);
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
    const users = await UserService.findAllUserService();
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json({ message: "Users retrieved successfully", count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};