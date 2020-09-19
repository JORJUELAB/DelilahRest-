module.exports = (sequelize, type) => {
  return sequelize.define("Favorito", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario: type.INTEGER,
    plato: type.INTEGER,
  });
};
