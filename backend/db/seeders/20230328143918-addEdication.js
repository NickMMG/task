'use strict';
const { edication } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await edication.bulkCreate([
      {
        content: 'Специалитет',
      },

      {
        content: 'Бакалавриат',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await edication.destroy({ truncate: { cascade: true } });
  },
};
