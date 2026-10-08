'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ongkir extends Model {
    static associate(models) {
      // definisikan asosiasi di sini kalau ada, misal:
      // Ongkir.hasMany(models.Transaction, { foreignKey: 'ongkir_id' });
    }
  }
  Ongkir.init({
    subdistrict_id: DataTypes.STRING,
    province_id: DataTypes.STRING,
    province: DataTypes.STRING,
    city_id: DataTypes.STRING,
    city: DataTypes.STRING,
    type: DataTypes.STRING,
    subdistrict_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Ongkir',
    tableName: 'Ongkirs' // sesuaikan dengan nama tabel di migration kamu
  });
  return Ongkir;
};