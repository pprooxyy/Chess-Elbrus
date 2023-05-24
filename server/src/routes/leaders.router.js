const router = require("express").Router();
const { Game, User } = require("../../db/models");
const { Op } = require("sequelize");

router.get("/", async (req, res) => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  try {
    const allUsers = await User.findAll({
      order: [["user_rating", "DESC"]],
      limit: 10,
      raw: true,
    });

    const leaderboard = [];

    for (const user of allUsers) {
      const userId = user.id;

      const userGames = await Game.findAll({
        where: {
          [Op.or]: [{ game_player1_id: userId }, { game_player2_id: userId }],
        },
        raw: true,
      });

      const userStats = {
        id: user.id,
        user_name: user.user_name,
        user_rating: user.user_rating,
        total: 0,
        wins: 0,
        losses: 0,
        draws: 0,
      };

      userGames.forEach((game) => {
        userStats.total++;
        if (game.game_winner_id === userId) {
          userStats.wins++;
        } else if (game.game_looser_id === userId) {
          userStats.losses++;
        } else if (game.game_tie) {
          userStats.draws++;
        }
      });

      leaderboard.push(userStats);
    }

    res.json(leaderboard);
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal server error" });
  }
});

module.exports = router;
