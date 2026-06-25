import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';

export const createUserService = async (userData) => {
  const salt = await bcrypt.genSalt(10)
  userData.password = await bcrypt.hash(userData.password, salt)
  return await User.create(userData)
};

export const findOneUserService = async(filter) => {
  return await User.findOne(filter).lean()
}

export const findAllUserService = async() => {
  return await User.find().lean()
}

export const updateUserService = async (filter, updateData) => {
  return await User.updateOne(filter, { $set: updateData })
};

export const deleteUserService = async(filter) => {
  return await User.findOneAndDelete(filter)
}

export const updateRoleService = async (filter, role) => {
  return await User.updateOne(filter, { $set: { role } })
}

export const loginService = async (details) => {
  return await User.find(details)
}