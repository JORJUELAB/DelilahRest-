//Crea datos por defecto

const { Role, Estado, FormaPago } = require("./db");

// ---- CREAR Roles ----
// Crear Administrador
Role.findOrCreate({
  where: { nombre: "Administrador" },
});
// Crear Cliente
Role.findOrCreate({
  where: { nombre: "Cliente" },
});

// ---- CREAR Estados ----
// Crear Nuevo
Estado.findOrCreate({
  where: { nombre: "Nuevo" },
});
// Crear Confirmado
Estado.findOrCreate({
  where: { nombre: "Confirmado" },
});
// Crear Preparando
Estado.findOrCreate({
  where: { nombre: "Preparando" },
});
// Crear Enviando
Estado.findOrCreate({
  where: { nombre: "Enviando" },
});
// Crear Entregado
Estado.findOrCreate({
  where: { nombre: "Entregado" },
});

// ---- CREAR Formas de Pago ----
// Crear Efectivo
FormaPago.findOrCreate({
  where: { nombre: "Efectivo" },
});
// Crear Tarjeta
FormaPago.findOrCreate({
  where: { nombre: "Tarjeta" },
});
