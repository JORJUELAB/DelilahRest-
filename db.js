const Sequelize = require("sequelize");

//Creación de los Modelos
const modeloPlato = require("./models/platos");
const modeloUsuario = require("./models/usuarios");
const modeloDescripcion = require("./models/descripcionPedido");
const modeloFavorito = require("./models/favoritos");
const modeloPedido = require("./models/pedidos");
const modeloFormaPago = require("./models/formasDePago");
const modeloEstado = require("./models/estados");
const modeloRole = require("./models/roles");

const NODE_ENV = process.env.NODE_ENV || "development";
require("dotenv").config({
  path: `.env.${NODE_ENV}`,
});

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

sequelize.sync({ force: false }).then(() => {
  console.log("Tablas sincronizadas!");
});

module.exports = {
  Plato,
};
