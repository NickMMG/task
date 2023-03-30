'use strict';
const { employee } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await employee.bulkCreate([
      {
        edication_id: 1,
        name: 'Петров Антон Валерьевич',
      },

      {
        edication_id: 2,
        name: 'Сидоров Николай Альбертович',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await employee.destroy({ truncate: { cascade: true } });
  },
};
