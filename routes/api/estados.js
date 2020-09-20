const router = require("express").Router();
const middleware = require("../middlewares");

const { Estado } = require("../../db");

// GET Obtener todos los estados
// SELECT * FROM Estados;
router.get("/", async (req, res) => {
  const estado = await Estado.findAll();
  res.json(estado);
});

// GET Obtener un estado por ID
// SELECT * FROM Estados WHERE id = id;
router.get("/:id", async (req, res) => {
  const estado = await Estado.findByPk(req.params.id);
  if (estado) {
    res.json(estado);
  } else {
    res.status(404).json({
      error: "Estado no encontrado.",
    });
  }
});

// POST Crear un estado
// INSERT INTO Estados(nombre) VALUES(nombre);
router.post("/", middleware.validarAdmin, async (req, res) => {
  const estado = await Estado.create(req.body)
    .then((estado) => {
      res.json(estado);
    })
    .catch(() => {
      res.status(409).json({
        error: "El estado ya existe",
      });
    });
});

// PUT Editar un estado
// UPDATE Estados SET nombre = nombre WHERE id = id;
router.put("/:id", middleware.validarAdmin, async (req, res) => {
  await Estado.update(req.body, {
    where: { id: req.params.id },
  })
    .then((estado) => {
      res.json({ message: `se ha modificado el estado ${req.params.id}` });
    })
    .catch(() => {
      res.status(409).json({
        error: "El estado ya existe",
      });
    });
});

// DELETE Eliminar un estado
// DELETE FROM Estados WHERE id = id;
router.delete("/:id", middleware.validarAdmin, async (req, res) => {
  await Estado.destroy({
    where: { id: req.params.id },
  });
  res.json({ message: `se ha eliminado el estado ${req.params.id}` });
});

module.exports = router;
