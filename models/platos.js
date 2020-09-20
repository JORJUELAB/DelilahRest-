module.exports = (sequelize, type) => {
  return sequelize.define("Plato", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: { type: type.STRING, allowNull: false },
    precio: { type: type.INTEGER, allowNull: false },
    descripcion: type.STRING,
    imagen: type.STRING,
  });
};
