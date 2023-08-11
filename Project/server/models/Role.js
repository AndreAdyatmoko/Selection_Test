'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // Asosiasi dengan tabel User (One-to-Many)
      Role.hasMany(models.User, { foreignKey: 'roleId' });
    }
  }

  Role.init(
    {
      roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Set unique menjadi true karena hanya ada dua peran: admin dan employee
      },
    },
    {
      sequelize,
      modelName: 'Role', // Nama model
    }
  );

  return Role;
};
