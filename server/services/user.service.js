const db = require("../models");

const createUser = async (userData) => {
  try {
    const user = await db.User.create(userData);
    return user;
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async () => {
  try {
    const users = await db.User.findAll();
    return users;
  } catch (error) {
    console.log(error);
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await db.User.findOne({ where: { email: email } });
    return user;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserByEmail,
};
