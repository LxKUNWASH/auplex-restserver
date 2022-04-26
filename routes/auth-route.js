const { Router } = require("express");

const { login } = require("../controllers/auth-controllers");
const { validarCorreo, validarContraseña, existeContraseña } = require("../middlewares/db-validators");

router = Router();

router.post("/",[
    validarCorreo,
    existeContraseña,
    validarContraseña
], login);

module.exports = router;
