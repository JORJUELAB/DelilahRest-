const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");

//Creación de los Modelos
const modeloPlato = require("./models/platos");
const modeloUsuario = require("./models/usuarios");
const modeloDescripcion = require("./models/descripcionPedido");
const modeloFavorito = require("./models/favoritos");
const modeloPedido = require("./models/pedidos");
const modeloFormaPago = require("./models/formasDePago");
const modeloEstado = require("./models/estados");
const modeloRole = require("./models/roles");

//Trae las variables almacenadas en el Environment
require("./env");

//Sincronización con la base de dátos ('database', 'username', 'password')
const sequelize = new Sequelize(
  process.env.DB_SCHEMA,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

// Sincronización de los modelos, crea las tablas si no existen
const Plato = modeloPlato(sequelize, Sequelize);
const Usuario = modeloUsuario(sequelize, Sequelize);
const Descripcion = modeloDescripcion(sequelize, Sequelize);
const Favorito = modeloFavorito(sequelize, Sequelize);
const Pedido = modeloPedido(sequelize, Sequelize);
const FormaPago = modeloFormaPago(sequelize, Sequelize);
const Estado = modeloEstado(sequelize, Sequelize);
const Role = modeloRole(sequelize, Sequelize);

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Tablas sincronizadas!");

    require("./init");
  })
  .catch(() => {
    console.log("No se pudo conectar con la base de dátos!!");
  });

module.exports = {
  Plato,
  Usuario,
  Descripcion,
  Favorito,
  Pedido,
  FormaPago,
  Estado,
  Role,
  sequelize,
  QueryTypes,
};
