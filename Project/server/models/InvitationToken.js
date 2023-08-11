'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class InvitationToken extends Model {
    static associate(models) {
      // Asosiasi dengan tabel User (Many-to-One)
      InvitationToken.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  InvitationToken.init(
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
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      expirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'InvitationToken', // Nama model
    }
  );

  return InvitationToken;
};
