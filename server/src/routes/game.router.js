const router = require("express").Router();

router.get("/game", (req, res) => {
  res.status(200).json(req.session.user);
});

module.exports = router;
