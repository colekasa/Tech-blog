const { Posts, Comments, User } = require("../models");
// const sequelize = require("./config/connection");

const users = [
  { username: "firstuser", password: "firstpass" },
  { username: "seconduser", password: "secondpass" },
];

const userSeed = () => {
  return User.bulkCreate(users, { individualHooks: true });
};

module.exports = userSeed;
