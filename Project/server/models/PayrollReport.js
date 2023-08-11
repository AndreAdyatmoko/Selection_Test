'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PayrollReport extends Model {
    static associate(models) {
      // Asosiasi dengan tabel User (Many-to-One)
      PayrollReport.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  PayrollReport.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Nama model asosiasi
          key: 'id',      // Kolom kunci asosiasi
        },
        onUpdate: 'CASCADE', // Aksi saat user di-update
        onDelete: 'CASCADE', // Aksi saat user dihapus
      },
      month: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      baseSalary: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      deductions: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      totalSalary: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'PayrollReport', // Nama model
    }
  );

  return PayrollReport;
};
