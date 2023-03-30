'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ edication }) {
      employee.belongsTo(edication, { foreignKey: 'edication_id' });
    }
  }
  employee.init(
    {
      edication_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'edication',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      name: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'employee',
    }
  );
  return employee;
};
