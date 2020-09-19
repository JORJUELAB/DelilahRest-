module.exports = (sequelize, type) => {
  return sequelize.define("Descripcion_pedido", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pedido: type.INTEGER,
    plato: type.INTEGER,
    cantidad: type.INTEGER,
  });
};
