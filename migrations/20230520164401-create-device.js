'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Devices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      device:{
        type:Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      uid :{
        type:Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id'
        },


      },
     
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Devices');
  }
};