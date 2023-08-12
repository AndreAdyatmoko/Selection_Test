'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class AttendanceLog extends Model {
    static associate(models) {
      // Asosiasi dengan tabel User (Many-to-One)
      AttendanceLog.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  AttendanceLog.init(
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
      clockIn: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      clockOut: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'AttendanceLog', 
    }
  );

  return AttendanceLog;
};
