'use strict';
const { Model } = require('sequelize');
// const User = require('./users')
module.exports = (sequelize, DataTypes) => {
  class FavouritePost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post}) {

      this.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
    }
  }
  FavouritePost.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      tableName: 'favouritePosts',
      modelName: 'FavouritePost',
    }
  );
  return FavouritePost;
};
