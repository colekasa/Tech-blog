const { Posts } = require("../../models");

const router = require("express").Router();
// const { Post } = require("../../models");

//
router.get("/", async (req, res) => {
  res.send("Working on posts!");
});

// A new post is created in the Posts model with a user_id
router.post("/", withAuth, async (req, res) => {
  try {
    const newPosts = await Posts.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPosts);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
