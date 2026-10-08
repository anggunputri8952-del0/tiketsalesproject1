'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ongkir extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
  });
  return Ongkir;
};