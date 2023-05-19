const router = require("express").Router();
const { Game } = require("../../db/models");
const { Op } = require("sequelize");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = Number(id);
    console.log("ID FROM PARAMS: ", userId);
    const userGames = await Game.findAll({
      where: {
        [Op.or]: [{ game_player1_id: userId }, { game_player2_id: userId }],
      },
      raw: true,
    });
    console.log("^^^^^^^^^^", userGames);
    const userStats = {
      total: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      totalDuration: 0,
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
      const start = new Date(game.game_start_time);
      const end = new Date(game.game_end_time);
      const duration = end - start;
      const durationInMinutes = Math.floor(duration / 1000 / 60);
      userStats.totalDuration += durationInMinutes;
    });
    console.log("USERSTATS: ", userStats);

    res.json({ userGames, userStats });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;