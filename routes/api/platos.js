const router = require("express").Router();
const middleware = require("../middlewares");

const { Plato } = require("../../db");

// GET Obtener todos los Platos
// SELECT * FROM Platos;
router.get("/", middleware.verificarToken, async (req, res) => {
  const platos = await Plato.findAll();
  res.json(platos);
});

// GET Obtener un plato por el ID
// SELECT * FROM Platos WHERE id = id;
router.get("/:id", middleware.verificarToken, async (req, res) => {
  const plato = await Plato.findByPk(req.params.id);
  if (plato) {
    res.json(plato);
  } else {
    res.status(404).json({
      error: "Plato no encontrado.",
    });
  }
});

// POST Crear un plato
// INSERT INTO Platos(nombre, precio, descripcion, imagen) VALUES(nombre, precio, descripcion, imagen);
router.post(
  "/",
  [middleware.verificarToken, middleware.validarAdmin],
  async (req, res) => {
    const plato = await Plato.create(req.body);
    res.json(plato);
  }
);

// PUT Editar un plato
// UPDATE Platos SET nombre = nombre, precio = precio, descripcion = descripcion, imagen = imagen WHERE id = platoId;
router.put(
  "/:id",
  [middleware.verificarToken, middleware.validarAdmin],
  async (req, res) => {
    const plato = await Plato.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(plato);
  }
);

// DELETE Eliminar un plato
// DELETE FROM Platos WHERE id = id;
router.delete(
  "/:id",
  [middleware.verificarToken, middleware.validarAdmin],
  async (req, res) => {
    await Plato.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: `se ha eliminado el plato ${req.params.id}` });
  }
);

module.exports = router;
