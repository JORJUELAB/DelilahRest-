const router = require("express").Router();
const bcrypt = require("bcryptjs"); // Uso de bcrypt para cifrar la contraseña
const { Usuario } = require("../../db");
const { check, validationResult } = require("express-validator"); //Agregar validaciones sobre los datos enviados en el body de la petición
const moment = require("moment"); // Librería de moment para el manejo de fechas
const jswt = require("jsonwebtoken");

//Trae las variables almacenadas en el Environment
require("./env");

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
    res.json(`Se ha creado el usuario ${usuario.usuario} satisfactoriamente!`);
  }
);

// POST Login
router.post("/login", async (req, res) => {
  const usuario = await Usuario.findOne({
    where: {
      [Op.or]: [{ email: req.body.email }, { usuario: req.body.usuario }],
    },
  });
  if (usuario) {
    if (bcrypt.compareSync(req.body.password, usuario.password)) {
      res.json({ success: createToken(usuario) });
    } else {
      res.json({ error: "Error en usuario y/o contraseña" });
    }
  } else {
    res.json({ error: "Error en usuario y/o contraseña" });
  }
});

// Crea el Token con el id del usuario, y expira en 1h
const createToken = (usuario) => {
  return jswt.sign(
    {
      usuarioId: usuario.id,
    },
    process.env.SECRET_JWT,
    { expiresIn: "1h" }
  );
};

module.exports = router;
