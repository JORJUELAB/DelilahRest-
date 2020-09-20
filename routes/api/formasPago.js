const router = require("express").Router();
const middleware = require("../middlewares");

const { FormaPago } = require("../../db");

// GET Obtener todas las Formas de pago
// SELECT * FROM FormaDePagos;
router.get("/", async (req, res) => {
  const formasPago = await FormaPago.findAll();
  res.json(formasPago);
});

// GET Obtener una Forma de pago por el ID
// SELECT * FROM FormaDePagos WHERE id = id;
router.get("/:id", async (req, res) => {
  const formasPago = await FormaPago.findByPk(req.params.id);
  if (formasPago) {
    res.json(formasPago);
  } else {
    res.status(404).json({
      error: "Forma de pago no encontrada.",
    });
  }
});

// POST Crear una forma de Pago
// INSERT INTO FormaDePagos(nombre) VALUES(nombre);
router.post("/", middleware.validarAdmin, async (req, res) => {
  const formasPago = await FormaPago.create(req.body)
    .then((forma) => {
      res.json(forma);
    })
    .catch(() => {
      res.status(409).json({
        error: "La forma de pago ya existe",
      });
    });
});

// PUT Editar una Forma de Pago
// UPDATE FormaDePagos SET nombre = nombre WHERE id = id;
router.put("/:id", middleware.validarAdmin, async (req, res) => {
  await FormaPago.update(req.body, {
    where: { id: req.params.id },
  })
    .then(() => {
      res.json({
        message: `se ha modificado la forma de pago ${req.params.id}`,
      });
    })
    .catch(() => {
      res.status(409).json({
        error: "La forma de pago ya existe",
      });
    });
});

// DELETE Eliminar una Forma de Pago
// DELETE FROM FormaDePagos WHERE id = id;
router.delete("/:id", middleware.validarAdmin, async (req, res) => {
  await FormaPago.destroy({
    where: { id: req.params.id },
  });
  res.json({ message: `se ha eliminado la forma de pago ${req.params.id}` });
});

module.exports = router;
