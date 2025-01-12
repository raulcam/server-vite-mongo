const User = require("../models/userModel");

//Traemos el modelo a usar, ejemplo Users

const getUsers = async () => {
  const users = await User.find();
  return users || null;
};

const getUserById = async (id) => {
  const users = await User.find();
  const user = users.find((item) => item.id === id);
  return user || null;
};

const getExistingUser = async (name, email) => {
  const users = await User.find();
  const user = users.find((item) => item.name === name && item.email === email);
  return user || null;
};

const createNewUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

const updateUser = async (id, updateData) => {
   const newDoc = await User.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
    runValidators: true,
  });
  return newDoc;
};

const deleteUser = async (id) =>{
  const deleteDoc = await User.deleteOne({
    _id: id
  })

  return deleteDoc;

}

module.exports = {
  getUsers,
  getUserById,
  createNewUser,
  getExistingUser,
  updateUser,
  deleteUser
};
