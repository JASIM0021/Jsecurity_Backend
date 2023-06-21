"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Command extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "cmdId",
      });
    }
  }
  Command.init(
    {
      tourch: DataTypes.BOOLEAN,
      music: DataTypes.JSON,
      message: DataTypes.JSON,
      call: DataTypes.JSON,
      location: DataTypes.JSON,
      cmdId: DataTypes.INTEGER,
      isDeactive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Command",
    }
  );
  return Command;
};
