
'use strict';
const {
  Model
} = require('sequelize');
// const User = require('./users')
module.exports = (sequelize, DataTypes) => {
  class FavouritePost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //define association here
      
    }
  }
  FavouritePost.init({
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    tableName:"favouritePosts",
    modelName: 'FavouritePost',
  });
  return FavouritePost; 
};