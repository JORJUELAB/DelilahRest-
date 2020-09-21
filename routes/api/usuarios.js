const router = require("express").Router();
const bcrypt = require("bcryptjs"); // Uso de bcrypt para cifrar la contraseña
const { Usuario } = require("../../db");
const middleware = require("../middlewares");
const { check, validationResult } = require("express-validator"); //Agregar validaciones sobre los datos enviados en el body de la petición
const jswt = require("jsonwebtoken");

//Trae las variables almacenadas en el Environment
require("../../env");

// POST - Realiza registro de Usuarios y Valida los campos con express-validator como middleware
// INSERT INTO Usuarios(usuario, nombre,  apellido, email, telefono, direccion, password, rol)
// VALUES(usuario, nombre,  apellido, email, telefono, direccion, password, rol);
router.post(
  "/register",
  [
    check("usuario", "El nombre de usario es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email no es correcto").isEmail(),
    check("direccion", "La dirección es obligatoria").not().isEmpty(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({ errores: error.array() });
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10); // Se cifra la contraseña 10 veces

    const usuario = await Usuario.create(req.body)
      .then(() => {
        res.status(201).json(`Se ha creado el usuario satisfactoriamente!`);
      })
      .catch((error) => {
        console.log(error);
        res
          .status(409)
          .json({ error: "El nombre de usuario y/o email ya existe" });
      });
  }
);

// POST Login
// Si viene el usuario => SELECT * FROM Usuarios WHERE usuario = usuario;
// Si viene el email   => SELECT * FROM Usuarios WHERE email = email;
// Finalmente valida si el password es el mismo que está cifrado en base de dátos
router.post(
  "/login",
  [
    check("email", "No es un email").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
  ],
  async (req, res) => {
    const { usuario, email, password } = req.body;
    const user = usuario
      ? await Usuario.findOne({ where: { usuario: req.body.usuario } })
      : await Usuario.findOne({ where: { email: req.body.email } });

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        res.json({ success: createToken(user) });
      } else {
        res.status(404).json({ error: "Error en usuario y/o contraseña" });
      }
    } else {
      res.status(404).json({ error: " " });
    }
  }
);

// Crea el Token con el id del usuario, y expira en 1h
const createToken = (usuario) => {
  return jswt.sign(
    {
      usuarioId: usuario.id,
      rol: usuario.rol,
    },
    process.env.SECRET_JWT ? process.env.SECRET_JWT : "delilahRestó123",
    { expiresIn: "1h" }
  );
};

// GET - Obtener todos los usuarios Sólo para los administradores
// SELECT * FROM Usuarios;
router.get(
  "/",
  [middleware.verificarToken, middleware.validarAdmin],
  async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json({ usuarios });
  }
);

// GET - Obtener un Usuario por ID- Sólo para los administradores
// SELECT * FROM Usuarios WHERE id = id;
router.get(
  "/:id",
  [middleware.verificarToken, middleware.validarAdmin],
  async (req, res) => {
    const usuario = await Usuario.findOne({
      where: { id: req.params.id },
    });
    res.json({ usuario });
  }
);

// PUT Editar un usuario - un usuario puede actualizar sus datos excepto su rol
// UPDATE Usuarios SET usuario = usuario, nombre = nombre,  apellido = apellido,
// email = email, telefono = telefono, direccion = direccion, password = password
// WHERE id = id;
router.put("/:id", middleware.verificarToken, async (req, res) => {
  if (req.rol == 1) {
    const usuario = await Usuario.findOne({ where: { id: req.params.id } });
    if (usuario) {
      if (req.body.password) {
        req.body.password = bcrypt.hashSync(req.body.password, 10); // Se cifra la contraseña 10 veces
      }
      await Usuario.update(req.body, {
        where: { id: req.params.id },
      })
        .then(() => {
          res.json(`Se ha actualizado el usuario satisfactoriamente!`);
        })
        .catch((error) => {
          return res
            .status(409)
            .json({ error: "El nombre de usuario y/o email ya existe" });
        });
    } else {
      return res
        .status(404)
        .json({ error: `El usuario ${req.params.id} no existe` });
    }
  } else {
    if (req.params.id == req.usuarioId) {
      const usuario = await Usuario.findOne({ where: { id: req.params.id } });
      if (usuario) {
        req.body.rol = usuario.rol;
        if (req.body.password) {
          req.body.password = bcrypt.hashSync(req.body.password, 10); // Se cifra la contraseña 10 veces
        }
        await Usuario.update(req.body, {
          where: { id: req.params.id },
        })
          .then(() => {
            return res.json(`Se ha actualizado el usuario satisfactoriamente!`);
          })
          .catch((error) => {
            return res
              .status(409)
              .json({ error: "El nombre de usuario y/o email ya existe" });
          });
      } else {
        return res
          .status(404)
          .json({ error: `El usuario ${req.params.id} no existe` });
      }
    } else {
      return res
        .status(401)
        .json({ error: "No tiene permisos para realizar esta operación" });
    }
  }
});

// DELETE Eliminar un usuario, si es admin puede borrar cualquier usuario, si es cliente, sólo se puede borrar a sí mismo
// DELETE FROM Usuarios WHERE id = id;
router.delete("/:id", middleware.verificarToken, async (req, res) => {
  if (req.rol == 1) {
    async (req, res) => {
      await Usuario.destroy({
        where: { id: req.params.id },
      });
      return res.json({
        message: `se ha eliminado el usuario ${req.params.id}`,
      });
    };
  } else {
    if (req.params.id == req.usuarioId) {
      await Usuario.destroy({
        where: { id: req.params.id },
      });
      return res.json({
        message: `se ha eliminado el usuario ${req.params.id}`,
      });
    } else {
      return res
        .status(401)
        .json({ error: "No tiene permisos para realizar esta operación" });
    }
  }
});

module.exports = router;
