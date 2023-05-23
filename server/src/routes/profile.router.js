const router = require("express").Router();
const { Game, User, Friend } = require("../../db/models");
const { Op, where } = require("sequelize");

router.get("/:id", async (req, res) => {
  try {
    //* получаем ID пользователя-хозяина страницы (о котором получаем инфо)
    const { id } = req.params;
    const userId = Number(id);

    //* получаем объект с данными юзера, на чью страницу зашли
    const profileOwnerFromDB = await User.findOne({
      where: { id: userId },
      raw: true,
    });

    //* получаем все игры, в которых фигурирует ID юзера-хозяина страницы
    const rawGames = await Game.findAll({
      where: {
        [Op.or]: [{ game_player1_id: userId }, { game_player2_id: userId }],
      },
      raw: true,
    });

    //* циклом изменяем каждый объект-игру, чтобы получить имена вместо ID и тд
    const promisedGames = rawGames.map(async (game) => {
      const player1 = await getNameById(game.game_player1_id);
      const player2 = await getNameById(game.game_player2_id);
      const winner = await getNameById(game.game_winner_id);
      const duration = calculateDuration(
        game.game_start_time,
        game.game_end_time
      );

      return {
        id: game.id,
        player1,
        player2,
        tie: game.game_tie,
        winner,
        duration,
        game_start_time: game.game_start_time.toLocaleString(),
      };
    });
    //* дожидаемся, когда все промисы выполнятся
    const userGames = await Promise.all(promisedGames);

    //* получаем массив всех друзей юзера-хозяина страинцы
    const rawFriends = await Friend.findAll({
      where: {
        [Op.or]: [{ user_id: userId }, { friend_id: userId }],
      },
      raw: true,
    });

    //* преобразуем rawFriends в массив ID друзей, отсеяв ID юзера-хозяина стр
    const friendsIds = rawFriends.map((item) => {
      if (item.user_id === userId) {
        return item.friend_id;
      } else {
        return item.user_id;
      }
    });

    //* по каждому ID получаем информацию о друге
    const promisedFriends = friendsIds.map(async (id) => {
      return getInfoById(id);
    });

    //* дожидаемся выполнения всех промисов
    const userFriends = await Promise.all(promisedFriends);
    // console.log(userFriends);

    //* формируем объект хозяина страницы в удобном формате
    const profileOwner = {
      id: profileOwnerFromDB.id,
      user_name: profileOwnerFromDB.user_name,
      user_rating: profileOwnerFromDB.user_rating,
      user_avatar: profileOwnerFromDB.user_avatar,
    };

    //* объект-заготовка для подсчета статистики пользователя-хозяина страницы
    const userStats = {
      total: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      totalDuration: 0,
    };
    //* подсчет статистики
    rawGames.forEach((game) => {
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

    //todo отправка результатов
    res.json({ profileOwner, userGames, userStats, userFriends });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
  //* функция (исп выше) для получения имени пользователя по его ID
  async function getNameById(userId) {
    try {
      const user = await User.findByPk(userId);

      if (user) {
        return user.user_name;
      } else {
        return "";
      }
    } catch (error) {
      console.error("Error fetching player name:", error);
      return "";
    }
  }
  //* функция (исп выше) для рассчета длительности игры с исп двух дат
  function calculateDuration(startTime, endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInMilliseconds = end - start;
    const durationInMinutes = Math.floor(durationInMilliseconds / 1000 / 60);

    return durationInMinutes;
  }

  //*функция для получения необходимой инфо о друге юзера по ID друга
  async function getInfoById(friendId) {
    const friend = await User.findByPk(friendId);

    return {
      id: friend.id,
      user_name: friend.user_name,
      user_rating: friend.user_rating,
      user_avatar: friend.user_avatar,
    };
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
