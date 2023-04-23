const { Posts, Comments, User } = require("../models");
// const sequelize = require("./config/connection");

const posts = [
  { title: "firstpost", description: "first content", user_id: 1 },
  { title: "secondpost", description: "second content", user_id: 2 },
];

const postsSeed = () => {
  return Posts.bulkCreate(posts);
};

module.exports = postsSeed;
