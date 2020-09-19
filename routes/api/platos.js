const router = require("express").Router();

//Get Obtener todos los Platos
router.get("/", (req, res) => {
  res.send({
    message: "Patos",
  });
});

//Post Crear Platos
router.post("/", function (req, res) {
  res.send("POST route on things.");
});

module.exports = router;
