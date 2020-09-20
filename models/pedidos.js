module.exports = (sequelize, type) => {
  return sequelize.define("Pedido", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    formaPago: {
      type: type.INTEGER,
      defaultValue: 1,
    },
    usuario: type.INTEGER,
    estado: {
      type: type.INTEGER,
      defaultValue: 1,
    },
  });
};
