module.exports = (sequelize, type) => {
  return sequelize.define("Pedido", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    formaPago: type.INTEGER,
    usuario: type.INTEGER,
    estado: type.STRING,
  });
};
