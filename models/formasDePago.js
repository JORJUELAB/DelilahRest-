module.exports = (sequelize, type) => {
  return sequelize.define("FormaDePago", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: type.STRING,
  });
};
