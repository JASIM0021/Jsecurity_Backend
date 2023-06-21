'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User,{
        foreignKey:'vId'
      })

    }
  }
  Video.init({
    filename: DataTypes.STRING,
    path: DataTypes.STRING,
   vId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Video',
  });
  return Video;
};