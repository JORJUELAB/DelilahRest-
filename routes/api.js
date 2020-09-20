const router = require("express").Router();

const middleware = require("./middlewares");
const apiPlatosRouter = require("./api/platos");
const apiUsuariosRouter = require("./api/usuarios");

// Rutas de Platos solo para usuarios loggeados
router.use("/platos", middleware.verificarToken, apiPlatosRouter);

router.use("/usuarios", apiUsuariosRouter);

module.exports = router;
