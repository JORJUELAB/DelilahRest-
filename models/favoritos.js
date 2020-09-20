module.exports = (sequelize, type) => {
  return sequelize.define("Favorito", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario: { type: type.INTEGER, allowNull: false },
    plato: { type: type.INTEGER, allowNull: false },
  });
};
