const { Posts, Comments, User } = require("../../models");
const withAuth = require("../../utils/auth");
const router = require("express").Router();

//TODO: Do I need a get?
router.get("/", withAuth, async (req, res) => {
  try {
  } catch (err) {
    res.status(400).json(err);
  }
});

//update the users comment
router.post("/:id", async (req, res) => {
  try {
    const commentUpdate = await Comments.update(
      req.body,
      {
        where: {
          comment_id: req.params.id,
        },
      },

      res.json(commentUpdate)
    );
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete the comment as long as you are the user who created it
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const commentData = await Comments.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comments found with this id!" });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
