const router = require("express").Router();
const { Game, Move, User } = require("../../db/models");

const getNameById = async(userId) => {
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
}; 

const calculateDuration= (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const durationInMilliseconds = end - start;
  const durationInMinutes = Math.floor(durationInMilliseconds / 1000 / 60);

  return durationInMinutes;
}

router.get('/', async (req, res) =>  {
  try {
    const rawGames = await Game.findAll({
      raw: true,
    });
    if (rawGames.length === 0) {
        return res.json([]);
    }

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
        player1Id: game.game_player1_id, 
        player2,
        player2Id: game.game_player2_id, 
        tie: game.game_tie,
        winner,
        winnerId: game.game_winner_id,
        duration,
        game_start_time: game.game_start_time.toLocaleString(),
      };
    });

    // await when all promises will be resolved 
    const allGames = await Promise.all(promisedGames);

    res.json(allGames);

} catch (error) {
    console.error("Failed to get all games:", error);
    res.status(400).json({ error: "Failed to get all games" });
}
});




module.exports = router;