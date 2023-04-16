const { Posts, Comments, User } = require("../../models");
const withAuth = require("../../utils/auth");
const router = require("express").Router();

//CRUD

// get all posts for the logged in user
router.get("/", withAuth, async (req, res) => {
  try {
    const postsData = await Posts.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    res.status(200).json(postsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//get a post by ID TODO: sequelize documentation with associations
router.get("/:id", async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {
      includes: [
        {
          model: Comments,
          foreignKey: "post_id",
        },
        {
          model: User,
          foreignKey: "user_id",
        },
      ],
    });
    res.status(200).json(postData);
  } catch (err) {}
});
//update a post by ID
router.post("/:id", async (req, res) => {
  try {
    const postUpdate = await Posts.update(
      {
        title: req.body.title,
        body: req.description.title,
      },
      {
        where: {
          id: req.params.id,
        },
      },

      res.json(postUpdate)
    );
  } catch (err) {
    res.status(400).json(err);
  }
});

//post route with a comments extension
router.post("/:id/comments", withAuth, async (req, res) => {
  try {
    // req.body= {
    //   description:""amsdmoai,
    // }
    // array1 = [1, 3, 4];;array2  = [2,5];
    // array.concatenate(array1,array2);
    // newArray = [...array1, ...array2]
    const commentData = await Comments.create({
      ...req.body,
      post_id: req.params.id,
      user_id: req.session.user_id,
    });

    res.status(200).json(commentData);
  } catch (err) {
    res.status(400).json(err);
  }
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

// by grabbing the id you can delete the post as long as the user_id matches your user_id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postsData = await Posts.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postsData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
