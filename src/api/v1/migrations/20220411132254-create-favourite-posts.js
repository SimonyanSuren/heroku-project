'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('favouritePosts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id'
        }
      },
      postId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'posts',
          },
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('favouritePosts');
  }
};