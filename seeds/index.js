const sequelize = require("../config/connection");
const userSeed = require("./userSeed");
const postSeed = require("./postsSeed");

const seedAll = async () => {
  await sequelize.sync({
    force: true,
  });
  await userSeed();
  await postSeed();
};

seedAll();
