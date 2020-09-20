const router = require("express").Router();

const middleware = require("./middlewares");
const apiPlatosRouter = require("./api/platos");
const apiRolesRouter = require("./api/roles");
const apiEstadosRouter = require("./api/estados");
const apiForamasPagoRouter = require("./api/formasPago");
const apiFavoritosRouter = require("./api/favoritos");
const apiUsuariosRouter = require("./api/usuarios");

// Rutas de Platos
router.use("/platos", middleware.verificarToken, apiPlatosRouter);
// Rutas de Roles
router.use(
  "/roles",
  [middleware.verificarToken, middleware.validarAdmin],
  apiRolesRouter
);

// Rutas de Estados
router.use("/estados", middleware.verificarToken, apiEstadosRouter);

// Rutas de FormasPago
router.use("/formasPago", middleware.verificarToken, apiForamasPagoRouter);

// Rutas de Favoritos
router.use("/favoritos", middleware.verificarToken, apiFavoritosRouter);

// Rutas de usuarios
router.use("/usuarios", apiUsuariosRouter);

module.exports = router;
