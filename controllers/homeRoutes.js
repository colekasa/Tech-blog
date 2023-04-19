// this will contain the handlebars routing
const router = require("express").Router();
const { Posts, User } = require("../models");
const withAuth = require("../utils/auth");
// const { User } = require("../../models");

//TODO: how to get the logged_in if statement to work on handlebars

router.get("/", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Posts,
        },
      ],
    });
    const user = userData.get({ plain: true });
    res.render("homepage", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/homepage");
  }
  res.render("login");
});

//get route that gets all of the posts without logging in
router.get("/dashboard", async (req, res) => {
  try {
    console.log(req.session.user_id);
    const postsData = await Posts.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });
    console.log(postsData);
    let posts = postsData.get({ plain: true });
    res.render("dashboard", { posts });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
