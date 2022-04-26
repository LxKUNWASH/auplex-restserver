const { Router } = require("express");

const { actualizarImagenCloudinary } = require("../controllers/upload-controllers");
const { idEsValida } = require("../middlewares/db-validators");
const existeDocumento = require("../middlewares/validar-documento")


router = Router();

router.put("/usuario/:id",[
idEsValida,
existeDocumento
], actualizarImagenCloudinary);

module.exports = router;
