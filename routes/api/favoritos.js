const router = require("express").Router();
const middleware = require("../middlewares");

const {
  Favorito,
  Usuario,
  Plato,
  Role,
  sequelize,
  QueryTypes,
} = require("../../db");

// GET Obtener todos los Favoritos
// SELECT * FROM Favoritos;
router.get("/", async (req, res) => {
  let favorito = {};
  if (req.rol == 1) {
    favorito = await sequelize.query(
      `SELECT f.id, u.nombre as usuario, p.nombre as plato 
        FROM Favoritos as f 
        JOIN Usuarios as u ON f.usuario = u.id
        JOIN Platos as p ON f.plato = p.id;`,
      {
        type: QueryTypes.SELECT,
      }
    );
    //favorito = await Favorito.findAll();
  } else {
    favorito = await sequelize.query(
      `SELECT p.nombre as plato 
        FROM Favoritos as f 
        JOIN Platos as p ON f.plato = p.id
        WHERE f.usuario = ${req.usuarioId};`,
      {
        type: QueryTypes.SELECT,
      }
    );
  }

  res.json(favorito);
});

// GET Obtener un Favorito por ID
// SELECT * FROM Favoritos WHERE id = id;
router.get("/:id", async (req, res) => {
  let favorito = {};
  if (req.rol == 1) {
    favorito = await sequelize.query(
      `SELECT p.nombre as plato 
        FROM Favoritos as f 
        JOIN Platos as p ON f.plato = p.id
        WHERE f.id = ${req.params.id}`,
      {
        type: QueryTypes.SELECT,
      }
    );
  } else {
    favorito = await sequelize.query(
      `SELECT p.nombre as plato 
        FROM Favoritos as f 
        JOIN Platos as p ON f.plato = p.id
        WHERE f.usuario = ${req.usuarioId} AND f.plato = ${req.params.id}`,
      {
        type: QueryTypes.SELECT,
      }
    );
  }

  if (favorito) {
    res.json(favorito);
  } else {
    res.status(404).json({
      error: "Favorito no encontrado.",
    });
  }
});

// POST Crear un Favorito
// INSERT INTO Favoritos(usuario, plato) VALUES(usuarioId, plato);
router.post("/", async (req, res) => {
  if (req.rol != 1) {
    req.body.usuario = req.usuarioId;
  }

  const favorito = await Favorito.create(req.body)
    .then((favorito) => {
      res.json(favorito);
    })
    .catch((error) => {
      res.status(409).json({
        error: "No se pudo guardar el Favorito",
      });
    });
});

// PUT Editar un Favorito
// UPDATE Favoritos SET usuario = usuarioId, plato = plato WHERE id = id;
router.put("/:id", middleware.validarAdmin, async (req, res) => {
  await Favorito.update(req.body, {
    where: { id: req.params.id },
  })
    .then((favorito) => {
      res.json({ message: `se ha modificado el favorito ${req.params.id}` });
    })
    .catch(() => {
      res.status(409).json({
        error: "El favorito ya existe",
      });
    });
});

// DELETE Eliminar un favorito
// DELETE FROM Favorito WHERE id = id;
router.delete("/:id", async (req, res) => {
  if (req.rol == 1) {
    await Favorito.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: `se ha eliminado el favorito ${req.params.id}` });
  } else {
    await Favorito.destroy({
      where: { id: req.params.id, usuario: req.usuarioId },
    })
      .then(() => {
        res.json({ message: `se ha eliminado el favorito ${req.params.id}` });
      })
      .catch(() => {
        res.status(400).json({ error: "No se pudo eliminar el favorito." });
      });
  }
});

module.exports = router;
