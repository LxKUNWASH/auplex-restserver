const { Router } = require("express");

const { obtenerUsuarios, obtenerUsuario, actualizarUsuario, crearUsuario, borrarUsuario } = require("../controllers/user-controllers");
const {idEsValida, validarNombre, validarRol, existeCorreo, existeContraseña, correoOcupado} = require("../middlewares/db-validators");
const esAdminRole = require("../middlewares/validar-role");
const ValidarJWT = require("../middlewares/validarJWT");

router = Router();

router.get("/", obtenerUsuarios);

router.get("/:id",[
idEsValida    
],obtenerUsuario)

router.put("/:id",[
idEsValida ,
correoOcupado
],actualizarUsuario)

router.post("/",[
validarNombre,
existeCorreo,
existeContraseña,
validarRol
],crearUsuario)

router.delete("/:id",[
idEsValida,
ValidarJWT,
esAdminRole
],borrarUsuario)

module.exports = router;