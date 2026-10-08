module.exports = (sequelize, DataTypes) => {
  const diskon = sequelize.define('diskon', {
    ID: {           
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    namadiskon: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nominal: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'diskon',
    timestamps: false // karena kolom createdAt/updatedAt gak ada di tabel
  });

  return diskon;
};
