// this will contain the handlebars routing
const router = require("express").Router();
const { Posts, User } = require("../models");
const withAuth = require("../utils/auth");

//get route that gets all of the posts without logging in
router.get("/", async (req, res) => {
  try {
    const postsData = await Posts.findAll({
      attributes: ["id", "title", "description", "date_created", "user_id"],
      include: [
        {
          model: User,
        },
      ],
    });
    const posts = postsData.map((post) => post.get({ plain: true }));
    res.render("homepage", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    //find the logged in user based on the session ID excluding the password for security purposes
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Posts,
        },
      ],
    });
    //serialize the data for handlebars
    const user = userData.get({ plain: true });
    const posts = user.posts;
    res.render("dashboard", {
      ...user,
      posts,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//TODO: why is my browser rendering cannot GET /homepage
// if the user is already logged in redirect them to the homepage
router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
  }
  res.render("login");
});

router.get("/post-update/:id", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Posts,
          where: {
            id: req.params.id,
          },
        },
      ],
    });
    const user = userData.get({ plain: true });
    const post = user.posts[0];
    res.render("post-update", {
      post,
    });
  } catch (err) {
    res.redirect("/");
  }
});

module.exports = router;
