'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class edication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ employee }) {
      edication.hasMany(employee, { foreignKey: 'edication_id' });
    }
  }
  edication.init(
    {
      content: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'edication',
    }
  );
  return edication;
};
