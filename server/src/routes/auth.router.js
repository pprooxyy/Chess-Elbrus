const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../db/models");

router.get("/", (req, res) => {
  // console.log("================================");
  res.json(req.session.user);
});

router.post("/register", async (req, res) => {

  try {
    const { user_name, user_email, user_password } = req.body;
  const hashPass = await bcrypt.hash(user_password, 10);
  const newUser = await User.findOrCreate({
    where: { user_email },
    defaults: {
      user_name,
      user_password: hashPass,
      user_avatar: "/assets/avatars/default.png",
      user_rating: 0,
    },
  });
  // console.log(newUser);
  if (newUser[1]) {
    req.session.user = {
      id: newUser[0].dataValues.id,
      user_name: newUser[0].dataValues.user_name,
      user_rating: newUser[0].dataValues.user_rating,
      user_avatar: newUser[0].dataValues.user_avatar,
    };
    req.session.save();
    res.json({
      msg: "User registered successfully",
      isAuthenticated: true,
      user: {
        id: newUser[0].dataValues.id,
        user_name: newUser[0].dataValues.user_name,
        user_rating: newUser[0].dataValues.user_rating,
        user_avatar: newUser[0].dataValues.user_avatar,
      },
    });
  } else {
    res.json({ msg: "User already exists" });
  }
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "error"})
  }
  
});

router.post("/login", async (req, res) => {
  const { user_email, user_password } = req.body;
  const user = await User.findOne({
    where: { user_email },
    plain: true,
  });
  // console.log(user);
  if (user) {
    const passCheck = await bcrypt.compare(user_password, user.user_password);
    if (passCheck) {
      req.session.user = {
        id: user.dataValues.id,
        user_name: user.dataValues.user_name,
        user_rating: user.dataValues.user_rating,
        user_avatar: user.dataValues.user_avatar,
      };
      // console.log("SESSION ", req.session);
      // req.session.save(); //!
      res.json({
        msg: "Success",
        isAuthenticated: true,
        user: {
          id: user.dataValues.id,
          user_name: user.dataValues.user_name,
          user_rating: user.dataValues.user_rating,
          user_avatar: user.dataValues.user_avatar,
        },
      });
    } else {
      res.json({ msg: "Wrong password" });
    }
  } else {
    res.json({ msg: "Such user doesn't exist" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("Cookie-Chess");
    res.json({ user: "", isAuthenticated: false});
  });
});

module.exports = router;
