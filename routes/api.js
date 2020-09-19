const router = require("express").Router();

const apiPlatosRouter = require("./api/platos");
const apiUsuariosRouter = require("./api/usuarios");

router.use("/platos", apiPlatosRouter);
router.use("/usuarios", apiUsuariosRouter);

module.exports = router;
