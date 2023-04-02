const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async(req,res) => {
  try{
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    });
    if (!user) {
      res.status(400).json({ message: 'No user account found!' });
      return;
    }
    const passCheck = user.checkPassword(req.body.password);

    if (!passCheck){
      res.status(400).send('Password incorrect!')
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.loggedIn = true;

      res.json({user, message: 'Logged In'});
  })
}catch (err) {
  res.status(400).json(err)
}
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
