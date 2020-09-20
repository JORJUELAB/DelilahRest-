module.exports = (sequelize, type) => {
  return sequelize.define("Descripcion_pedido", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pedido: { type: type.INTEGER, allowNull: false },
    plato: { type: type.INTEGER, allowNull: false },
    cantidad: { type: type.INTEGER, allowNull: false },
  });
};
