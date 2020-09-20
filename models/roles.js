module.exports = (sequelize, type) => {
  return sequelize.define("Role", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: type.STRING,
      unique: true,
      allowNull: false,
    },
  });
};
