const router = require("express").Router();
// const { Post } = require("../../models");

//
router.get("/", async (req, res) => {
  res.send("Working on posts!");
});

module.exports = router;
