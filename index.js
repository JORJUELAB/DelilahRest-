const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const apiRouter = require("./routes/api");

const app = express();

//Trae las variables almacenadas en el Environment
require("./env");

// Levanta la base de datos y crea las tablas si estas no existen
require("./db");

/*
 * Pobla la base de datos con los datos iniciales
 * Como Roles, Forma de pago, estados
 */
require("./init");

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Agrega las rutas localhost:PORT/api/RUTAS
app.use("/api", apiRouter);

// Iniciar el servidor por el puerto definido en las variables del sistema por defecto 3000
const port = process.env.APPI_PORT ? process.env.APPI_PORT : 3000;
app.listen(port, () => {
  console.log(`Sevidor eschucando en http://localhost:${port}`);
});
