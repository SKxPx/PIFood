const { DataTypes } = require('sequelize');
// Exportamos una función que define el modelo
// Luego le injertamos la conexión a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('diets', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
  );
};