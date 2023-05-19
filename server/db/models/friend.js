"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Friend.belongsTo(models.User, { as: "User", foreignKey: "user_id" });
      Friend.belongsTo(models.User, { as: "Friend", foreignKey: "friend_id" });
    }
  }
  Friend.init(
    {
      user_id: DataTypes.INTEGER,
      friend_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Friend",
    }
  );
  return Friend;
};
