module.exports = (sequelize, type) => {
  return sequelize.define("Usuario", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario: {
      type: type.STRING,
      unique: true,
      allowNull: false,
    },
    nombre: type.STRING,
    apellido: type.STRING,
    email: {
      type: type.STRING,
      unique: true,
      allowNull: false,
    },
    telefono: type.STRING,
    direccion: type.STRING,
    password: type.STRING,
    rol: {
      type: type.INTEGER,
      defaultValue: 2,
      allowNull: false,
    },
  });
};
