// this will contain the handlebars routing
const router = require("express").Router();
// const { User } = require("../../models");

//
router.get("/", async (req, res) => {
  console.log("testing");
  res.send("Working on users!");
});


//get route that gets all of the posts without logging in

module.exports = router;
