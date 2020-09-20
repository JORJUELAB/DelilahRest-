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
    },
    nombre: type.STRING,
    apellido: type.STRING,
    email: {
      type: type.STRING,
      unique: true,
    },
    telefono: type.STRING,
    direccion: type.STRING,
    password: type.STRING,
    rol: {
      type: type.INTEGER,
      defaultValue: 2,
    },
  });
};
