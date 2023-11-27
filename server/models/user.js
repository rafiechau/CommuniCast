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
      User.hasMany(models.Comment, {foreignKey: "userId"})
      User.hasMany(models.Post, {
        as: 'user',
        foreignKey: { name: 'userId'},
        onDelete: 'CASCADE'
      });
      User.belongsToMany(models.Post, {
        as: 'like',
        foreignKey: 'userId',
        through: models.Vote
      })
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      imagePath: DataTypes.STRING,
      isVerify: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
