module.exports = (sequelize, type) => {
  return sequelize.define("Usuario", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario: type.STRING,
    nombre: type.STRING,
    apellido: type.STRING,
    email: type.STRING,
    telefono: type.STRING,
    direccion: type.STRING,
    password: type.STRING,
    rol: type.INTEGER,
  });
};
