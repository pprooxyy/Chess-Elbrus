const router = require("express").Router();
const { Game, User } = require("../../db/models");
const { Op, where } = require("sequelize");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = Number(id);
    // console.log("ID FROM PARAMS: ", userId);

    const profileOwnerFromDB = await User.findOne({
      where: { id: userId },
      raw: true,
    });

    const userGames = await Game.findAll({
      where: {
        [Op.or]: [{ game_player1_id: userId }, { game_player2_id: userId }],
      },
      raw: true,
    });
    // console.log("^^^^^^^^^^", userGames);

    const profileOwner = {
      id: profileOwnerFromDB.id,
      user_name: profileOwnerFromDB.user_name,
      user_rating: profileOwnerFromDB.user_rating,
      user_avatar: profileOwnerFromDB.user_avatar,
    };

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
    // console.log("USERSTATS: ", userStats);

    res.json({ profileOwner, userGames, userStats });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.put("/", async (req, res) => {
  const { newName, newPic } = req.body;
  const id = req.session.user.id;
  // console.log("------->", id);
  try {
    if (newName !== "") {
      await User.update({ user_name: newName }, { where: { id }, raw: true });
    }
    if (newPic !== "") {
      await User.update({ user_avatar: newPic }, { where: { id }, raw: true });
    }

    // Получение обновленных данных пользователя
    const editedUser = await User.findByPk(id);
    // console.log(editedUser);
    const data = {
      id: editedUser.id,
      user_name: editedUser.user_name,
      user_rating: editedUser.user_rating,
      user_avatar: editedUser.user_avatar,
    };

    req.session.user = data; //!

    res.json(data);
  } catch (error) {
    console.log(error);
    res.json({ error: "Failed to update user" });
  }
});

module.exports = router;
