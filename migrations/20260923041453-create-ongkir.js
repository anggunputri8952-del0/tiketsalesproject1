'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ongkirs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      subdistrict_id: {
        type: Sequelize.STRING
      },
      province_id: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      city_id: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      subdistrict_name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ongkirs');
  }
};