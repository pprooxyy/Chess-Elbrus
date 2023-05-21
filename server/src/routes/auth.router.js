const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../db/models");

router.get("/", (req, res) => {
  // console.log(" session =>", req.session);
  res.status(200).json(req.session.user);
});

router.post("/register", async (req, res) => {
  const { user_name, user_email, user_password } = req.body;
  const hashPass = await bcrypt.hash(user_password, 10);
  const newUser = await User.findOrCreate({
    where: { user_email },
    defaults: {
      user_name,
      user_password: hashPass,
      user_avatar: "",
      user_rating: 0,
    },
  });
  if (newUser[1]) {
    req.session.user = {
      user_id: newUser[0].dataValues.id,
      user_name: newUser[0].dataValues.user_name,
      user_rating: newUser[0].dataValues.user_rating,
    };
    req.session.save();
    res.json({ msg: "User registered successfully" });
  } else {
    res.json({ msg: "User already exists" });
  }
});

router.post("/login", async (req, res) => {
  const { user_email, user_password } = req.body;
  const user = await User.findOne({
    where: { user_email },
    plain: true,
  });
  if (user) {
    const passCheck = await bcrypt.compare(user_password, user.user_password);
    if (passCheck) {
      req.session.user = {
        user_id: user.dataValues.id,
        user_name: user.dataValues.user_name,
        user_rating: user.dataValues.user_rating,
      };
      res.json({ msg: "Success" });
    } else {
      res.json({ msg: "Wrong password" });
    }
  } else {
    res.json({ msg: "Such user doesn't exist" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("Cookie");
    res.json({ user: "" });
  });
});

module.exports = router;
