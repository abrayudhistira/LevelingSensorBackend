// models/data.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Data extends Model {}

  Data.init({
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    status_leveling: {
      type: DataTypes.STRING(255),
      allowNull: false,
      // collate default ikut setting database utf8mb4_general_ci
    },
    atfullstate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    distance: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Data',
    tableName: 'data',
    timestamps: false,      // tidak ada createdAt/updatedAt
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: ['id']
      }
    ]
  });

  return Data;
};