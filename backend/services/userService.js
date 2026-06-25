import User from "../models/userModel.js";

export const createUserService = async(userData) => {
  return await User.create(userData)
}

export const findOneUserService = async(filter) => {
  return await User.findOne(filter).lean()
}

export const findAllUserService = async() => {
  return await User.find().lean()
}