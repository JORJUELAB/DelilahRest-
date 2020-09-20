const router = require("express").Router();

const middleware = require("./middlewares");
const apiPlatosRouter = require("./api/platos");
const apiRolesRouter = require("./api/roles");
const apiUsuariosRouter = require("./api/usuarios");

// Rutas de Platos solo para usuarios loggeados
router.use("/platos", middleware.verificarToken, apiPlatosRouter);

router.use("/roles", middleware.verificarToken, apiRolesRouter);
router.use("/usuarios", apiUsuariosRouter);

module.exports = router;
