const router = require("express").Router();
const bcrypt = require("bcryptjs"); // Uso de bcrypt para cifrar la contraseña
const { Usuario } = require("../../db");
const { check, validationResult } = require("express-validator"); //Agregar validaciones sobre los datos enviados en el body de la petición

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
      return res.status(422).json({ errores: errors.array() });
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10); // Se cifra la contraseña 10 veces
    const usuario = await Usuario.create(req.body);
    res.json(`Se ha creado el usuario ${usuario.usuario} satisfactoriamente!`);
  }
);

module.exports = router;
