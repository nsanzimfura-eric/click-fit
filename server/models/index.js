const User = require("./user.model");

const sequelize = require("../config/db");

const db = {
  User,
  // other models
  sequelize,
  Sequelize: require("sequelize"),
};

// Associations can go here
module.exports = db;
