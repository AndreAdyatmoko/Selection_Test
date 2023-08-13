'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Asosiasi dengan tabel Role (Many-to-One)
      User.belongsTo(models.Role, { foreignKey: 'roleId' });

      // Asosiasi dengan tabel AttendanceLog (One-to-Many)
      User.hasMany(models.AttendanceLog, { foreignKey: 'userId' });

      // Asosiasi dengan tabel PayrollReport (One-to-Many)
      User.hasMany(models.PayrollReport, { foreignKey: 'userId' });
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      joinDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',   
          key: 'id',        
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE',
      },
      basedsalary: {
        type: DataTypes.INTEGER,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
