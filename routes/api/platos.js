const router = require("express").Router();

const { Plato } = require("../../db");

// GET Obtener todos los Platos
// SELECT * FROM Platos;
router.get("/", async (req, res) => {
  const platos = await Plato.findAll();
  res.json(platos);
});

// POST Crear un plato
// INSERT INTO Platos(nombre, precio, descripcion, imagen) VALUES(nombre, precio, descripcion, imagen);
router.post("/", async (req, res) => {
  const plato = await Plato.create(req.body);
  res.json(plato);
});

// PUT Editar un plato
// UPDATE Platos SET nombre = nombre, precio = precio, descripcion = descripcion, imagen = imagen WHERE id = platoId;
router.put("/:platoId", async (req, res) => {
  await Plato.update(req.body, {
    where: { id: req.params.platoId },
  });
  res.json({ message: `se ha modificado el plato ${req.params.platoId}` });
});

// DELETE Eliminar un plato
// DELETE FROM Platos WHERE id = platoId;
router.delete("/:platoId", async (req, res) => {
  await Plato.destroy({
    where: { id: req.params.platoId },
  });
  res.json({ message: `se ha eliminado el plato ${req.params.platoId}` });
});

module.exports = router;
