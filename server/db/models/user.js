"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Game, { foreignKey: "game_player1_id" });
      User.hasMany(models.Game, { foreignKey: "game_player2_id" });
      User.belongsToMany(models.User, {
        as: "Friend",
        through: "Friends",
        foreignKey: "user_id",
        otherKey: "friend_id",
      });
    }
  }
  User.init(
    {
      user_name: DataTypes.STRING,
      user_email: DataTypes.STRING,
      user_password: DataTypes.STRING,
      user_avatar: DataTypes.STRING,
      user_rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
