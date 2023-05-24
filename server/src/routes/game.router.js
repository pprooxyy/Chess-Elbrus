const router = require("express").Router();
const { Game, Move,  } = require("../../db/models");

router.get("/game", (req, res) => {
  res.status(200).json(req.session.user);

  
});

module.exports = router;
