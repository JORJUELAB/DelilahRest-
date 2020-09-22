const jwt = require("jsonwebtoken");
const { Role } = require("../db");

//Trae las variables almacenadas en el Environment
require("../env");

// Verifica si el token es válido
const verificarToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return res
      .status(404)
      .json({ error: "No se incluyó el token en la cabecera" });
  }

  const userToken = req.headers["authorization"].split(" ")[1];
  let dedoceToken = {};
  try {
    dedoceToken = jwt.verify(
      userToken,
      process.env.SECRET_JWT ? process.env.SECRET_JWT : "delilahRestó123"
    );
  } catch (error) {
    // Verifica si ha expirado el token
    if (error.name == "TokenExpiredError") {
      return res.status(400).json({ error: "El Token ha expirado" });
    }
    return res
      .status(403)
      .json({ error: "No tiene permisos para realizar esta operación" });
  }
  req.usuarioId = dedoceToken.usuarioId;
  req.rol = dedoceToken.rol;
  next();
};

// Valida si el usuario tiene rol de Administrador
const validarAdmin = async (req, res, next) => {
  const role = await Role.findByPk(req.rol);
  if (role.nombre == "Administrador") {
    next();
  } else {
    return res.status(401).json({
      error: "Usuario no Autorizado!",
    });
  }
};

module.exports = {
  verificarToken,
  validarAdmin,
};
