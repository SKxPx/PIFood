const { DataTypes } = require('sequelize');
// Exportamos una función que define el modelo
// Luego le injertamos la conexión a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipes', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    summary: {
      type: DataTypes.STRING,
    },
    healthScore: {
      type: DataTypes.STRING,
    },
    stepByStep: {
      type: DataTypes.STRING
    },
  },
  { timestamps: false }
  );
};
