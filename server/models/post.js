'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, {
        as: 'user',
        foreignKey: {
          name: 'userId'
        },
        onDelete: 'CASCADE'
      })
      Post.belongsToMany(models.User, {
        as: 'like',
        foreignKey: 'postId',
        through: models.Vote
      })
      Post.hasMany(models.Vote, { as: 'votes', foreignKey: 'postId' });
      Post.hasMany(models.Comment, {foreignKey: "postId"})
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortDescription:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    des:{
      type: DataTypes.TEXT,
      allowNull: false
    }, 
    image: DataTypes.STRING,
    voteCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};