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
    usuario: { type: type.INTEGER, allowNull: false },
    estado: {
      type: type.INTEGER,
      defaultValue: 1,
    },
  });
};
