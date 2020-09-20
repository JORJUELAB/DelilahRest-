module.exports = (sequelize, type) => {
  return sequelize.define("Estado", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: type.STRING,
      unique: true,
    },
  });
};
