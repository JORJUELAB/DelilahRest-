const router = require("express").Router();
const middleware = require("../middlewares");

const {
  Pedido,
  Usuario,
  FormaPago,
  Role,
  Estado,
  Descripcion,
  sequelize,
  QueryTypes,
} = require("../../db");

// GET Obtener todos los Pedidos
router.get("/", async (req, res) => {
  let pedidos = {};
  if (req.rol == 1) {
    pedidos = await sequelize.query(
      `SELECT e.nombre as estado, pd.createdAt as hora, concat('#',dp.pedido) as número, group_concat(dp.cantidad,'x',pl.nombre SEPARATOR ' ') as descripcion,
                      fp.nombre as pago,
                      sum(pl.precio*dp.cantidad) as total,
                      concat(u.nombre,' ',u.apellido) as usuario,
                      u.direccion as dirección
                      FROM Descripcion_pedidos as dp
                      JOIN Platos as pl
                      ON dp.plato = pl.id
                      JOIN Pedidos as pd
                      ON dp.pedido = pd.id
                      JOIN FormaDePagos as fp
                      ON pd.formaPago = fp.id
                      JOIN Estados as e
                      ON pd.estado = e.id
                      JOIN Usuarios as u
                      ON pd.usuario = u.id
                      group by dp.pedido;`,
      {
        type: QueryTypes.SELECT,
      }
    );
  } else {
    pedidos = await sequelize.query(
      `SELECT e.nombre as estado, pd.createdAt as hora, concat('#',dp.pedido) as número, group_concat(dp.cantidad,'x',pl.nombre SEPARATOR ' ') as descripcion,
                      fp.nombre as pago,
                      sum(pl.precio*dp.cantidad) as total,
                      concat(u.nombre,' ',u.apellido) as usuario,
                      u.direccion as dirección
                      FROM Descripcion_pedidos as dp
                      JOIN Platos as pl
                      ON dp.plato = pl.id
                      JOIN Pedidos as pd
                      ON dp.pedido = pd.id
                      JOIN FormaDePagos as fp
                      ON pd.formaPago = fp.id
                      JOIN Estados as e
                      ON pd.estado = e.id
                      JOIN Usuarios as u
                      ON pd.usuario = u.id
                      WHERE pd.usuario = ${req.usuarioId}
                      group by dp.pedido;`,
      {
        type: QueryTypes.SELECT,
      }
    );
  }

  res.json(pedidos);
});

// --- TODO ---------
// GET Obtener un Favorito por ID
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

// POST Crear un Pedido
router.post("/", async (req, res) => {
  const { formaPago, platos } = req.body;
  if (req.rol != 1) {
    req.body.usuario = req.usuarioId;
  }
  let solicitud = {};
  await Pedido.create({ formaPago, usuario: req.usuarioId })
    .then(async (orden) => {
      platos.forEach(async (plato) => {
        await Descripcion.create({
          pedido: orden.id,
          plato: plato.id,
          cantidad: plato.cantidad,
        }).catch(() => {
          return res
            .status(400)
            .json({ error: "Hubo un error al generar el pedido." });
        });
      });
      solicitud = orden;
    })
    .catch((error) => {
      console.log(error);
      res.status(409).json({
        error: "No se pudo guardar el Pedido",
      });
    });
  setTimeout(async () => {
    await sequelize
      .query(
        `SELECT e.nombre as estado, pd.createdAt as hora, concat('#',dp.pedido) as número, group_concat(dp.cantidad,'x',pl.nombre SEPARATOR ' ') as descripcion,
                        fp.nombre as pago,
                        sum(pl.precio*dp.cantidad) as total,
                        concat(u.nombre,' ',u.apellido) as usuario,
                        u.direccion as dirección
                        FROM Descripcion_pedidos as dp
                        JOIN Platos as pl
                        ON dp.plato = pl.id
                        JOIN Pedidos as pd
                        ON dp.pedido = pd.id
                        JOIN FormaDePagos as fp
                        ON pd.formaPago = fp.id
                        JOIN Estados as e
                        ON pd.estado = e.id
                        JOIN Usuarios as u
                        ON pd.usuario = u.id
                        WHERE dp.pedido = ${solicitud.id}
                        group by dp.pedido;`,
        {
          type: QueryTypes.SELECT,
        }
      )
      .then((pedido) => {
        return res.json(pedido);
      });
  }, 5);
});

// PUT Editar un Pedido
router.put("/:id", async (req, res) => {
  const { formaPago, platos } = req.body;
  if (!platos) {
    return res.status(400).json({ error: "No se registraron platos" });
  }
  if (req.rol != 1) {
    req.body.usuario = req.usuarioId;
  }
  let pedido = await Pedido.update(
    { formaPago, usuario: req.body.usuario },
    { where: { id: req.params.id, usuario: req.body.usuario } }
  ).catch(() => {
    res.status(409).json({
      error: "No se pudo modificar el pedido.",
    });
  });
  if (pedido[0]) {
    await Descripcion.destroy({
      where: { pedido: req.params.id },
    });
    platos.forEach(async (plato) => {
      await Descripcion.create(
        {
          pedido: req.params.id,
          plato: plato.id,
          cantidad: plato.cantidad,
        },
        { where: { pedido: req.params.id } }
      ).catch(() => {
        return res
          .status(409)
          .json({ error: "No se pudo modificar el pedido." });
      });
    });
    res.json({ message: `se ha modificado el Pedido ${req.params.id}` });
  } else {
    res.status(409).json({
      error: "No se pudo modificar el pedido.",
    });
  }
});

// DELETE Eliminar un pedido
router.delete("/:id", async (req, res) => {
  if (req.rol == 1) {
    await Pedido.destroy({
      where: { id: req.params.id },
    });
    await Descripcion.destroy({
      where: { pedido: req.params.id },
    });
    res.json({ message: `se ha eliminado el pedido ${req.params.id}` });
  } else {
    let pedido = await Pedido.destroy({
      where: { id: req.params.id, usuario: req.usuarioId },
    }).catch(() => {
      res.status(400).json({ error: "No se pudo eliminar el pedido." });
    });
    if (pedido) {
      await Descripcion.destroy({
        where: { pedido: req.params.id },
      });
      res.json({ message: `se ha eliminado el pedido ${req.params.id}` });
    } else {
      res.status(401).json({ error: "Usuario no Autorizado!" });
    }
  }
});

module.exports = router;
