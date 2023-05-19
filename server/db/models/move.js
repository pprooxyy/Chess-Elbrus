"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Move extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Move.belongsTo(models.Game);
      Move.belongsTo(models.User);
    }
  }
  Move.init(
    {
      game_id: DataTypes.INTEGER,
      move_number: DataTypes.INTEGER,
      player_id: DataTypes.INTEGER,
      move: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Move",
    }
  );
  return Move;
};
