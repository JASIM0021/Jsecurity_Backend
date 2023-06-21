'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Commands', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tourch: {
        type: Sequelize.BOOLEAN,
      
      },
      music: {
        type: Sequelize.JSON
      },
      message: {
        type: Sequelize.JSON
      },
      call:{
        type: Sequelize.JSON,

      },
      isDeactive:{
        type: Sequelize.BOOLEAN,
      },
      location:{
        type: Sequelize.JSON,

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      cmdId :{
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
    await queryInterface.dropTable('Commands');
  }
};