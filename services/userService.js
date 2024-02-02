// services/userService.js
const User = require('../models/user');
const { hashPassword } = require('./encryption');

async function createUser(username, password) {
  try {
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      username: username,
      password: hashedPassword
    });
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

module.exports = {
  createUser,
  getAllUsers
};
