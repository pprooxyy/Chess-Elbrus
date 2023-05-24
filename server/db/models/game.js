"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Game.hasMany(models.Move);
      Game.belongsTo(models.User, {
        as: "Player1",
        foreignKey: "game_player1_id",
      });
      Game.belongsTo(models.User, {
        as: "Player2",
        foreignKey: "game_player2_id",
      });
    }
  }
  Game.init(
    {
      game_player1_id: DataTypes.INTEGER,
      game_player2_id: DataTypes.INTEGER,
      game_status: DataTypes.BOOLEAN,
      game_winner_id: DataTypes.INTEGER,
      game_looser_id: DataTypes.INTEGER,
      game_tie: DataTypes.BOOLEAN,
      game_start_time: DataTypes.DATE,
      game_end_time: DataTypes.DATE,
      game_fen: DataTypes.STRING,
    },
    {
      
      sequelize,
      modelName: "Game",
    }
  );
  return Game;
};
