const router = require("express").Router();
const bcrypt = require("bcryptjs"); // Uso de bcrypt para cifrar la contraseña
const { Usuario } = require("../../db");
const middleware = require("../middlewares");
const { check, validationResult } = require("express-validator"); //Agregar validaciones sobre los datos enviados en el body de la petición
const jswt = require("jsonwebtoken");

//Trae las variables almacenadas en el Environment
require("../../env");

// GET - Obtener todos los usuarios Sólo para los administradores
router.get(
  "/",
  [middleware.verificarToken, middleware.validarAdmin],
  async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.json({ usuarios });
  }
);

// POST - Realiza registro de Usuarios y Valida los campos con express-validator como middleware
router.post(
  "/register",
  [
    check("usuario", "El nombre de usario es obligatorio").not().isEmpty(),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("email", "El email no es correcto").isEmail(),
    check("direccion", "La dirección es obligatoria").not().isEmpty(),
    check("rol", "El Rol es obligatorio").not().isEmpty(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({ errores: error.array() });
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10); // Se cifra la contraseña 10 veces
    const usuario = await Usuario.create(req.body);
    res
      .status(201)
      .json(`Se ha creado el usuario ${usuario.usuario} satisfactoriamente!`);
  }
);

// POST Login
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
      res.status(404).json({ error: "Error en usuario y/o contraseña" });
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
    process.env.SECRET_JWT,
    { expiresIn: "1h" }
  );
};

module.exports = router;
