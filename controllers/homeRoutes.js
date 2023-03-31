// this will contain the handlebars routing
const router = require("express").Router();
// const { User } = require("../../models");

//
router.get("/", async (req, res) => {
  console.log("testing");
  res.send("Working on users!");
});

module.exports = router;
