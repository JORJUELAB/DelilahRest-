module.exports = (sequelize, type) => {
  return sequelize.define("Plato", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: type.STRING,
    precio: type.INTEGER,
    descripcion: type.STRING,
    imagen: type.STRING,
  });
};
