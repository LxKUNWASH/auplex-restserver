const { findOne } = require("../models/users");
const User = require("../models/users");

const idEsValida = async (req, res, next) => {
  const ObjectId = require("mongoose").Types.ObjectId;

  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ msg: "La id debe ser de mongo" });
  }

  const usuario = await User.findById(id);

  if (!usuario) {
    return res
      .status(404)
      .json({ msg: `No existe ningun usuario con la id: ${id}` });
  }

  next();
};

const validarNombre = (req, res, next) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ msg: "El nombre es obligatorio" });
  }

  const expresionNombre =
    /^([a-zA-Z]{2,}\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;

  if (!expresionNombre.test(nombre)) {
    return res.status(400).json({
      msg: "El Formato de nombre no es valido, debe contener al menos un nombre y apellido ",
    });
  }

  next();
};

const existeCorreo = async (req, res, next) => {
  const { correo } = req.body;

  if (!correo) {
    return res.status(400).json({ msg: "El Correo es obligatorio" });
  }

  const expresionCorreo =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{3,}@[a-z]{3,}[.]{1}[a-z]{3,}$/;

  if (!expresionCorreo.test(correo)) {
    return res.status(400).json({
      msg: "El Formato de correo no es valido, intente algo similar a: example@hotmail.com ",
    });
  }

  const usuario = await User.findOne({ correo });

  if (usuario) {
    return res.status(400).json({
      msg: `El correo ${correo} ya se encuentra asociado a un usuario`,
    });
  }

  next();
};

const correoOcupado = async (req, res, next) => {
  const { correo } = req.body;

  const usuario = await User.findOne({ correo });

  if (usuario) {
    return res.status(400).json({
      msg: `El correo ${correo} ya se encuentra asociado a un usuario`,
    });
  }

  next();
};

const existeContraseña = (req, res, next) => {
  const { contraseña } = req.body;

  if (!contraseña) {
    return res.status(400).json({ msg: "La Contraseña es obligatoria" });
  }

  next();
};

const validarCorreo = async (req, res, next) => {
  const { correo } = req.body;

  if (!correo) {
    return res.status(400).json({ msg: "El Correo es obligatorio" });
  }

  const usuario = await User.findOne({ correo });

  if (!usuario) {
    return res.status(404).json({ msg: "Correo invalido" });
  }

  next();
};

const validarContraseña = async (req, res, next) => {
  const { contraseña } = req.body;

  const usuario = await User.findOne({ contraseña });

  if (!usuario) {
    return res.status(401).json({ msg: "Contraseña invalida" });
  }

  next();
};

const validarRol = async (req, res, next) => {
  const Role = require("../models/roles");

  const { rol } = req.body;

  if (!rol) {
    return res.status(400).json({ msg: "El rol es obligatorio" });
  }

  const role = await Role.findOne({ rol });

  if (!role) {
    return res.status(404).json({ msg: "rol no valido" });
  }

  next();
};
module.exports = {
  idEsValida,
  validarNombre,
  validarRol,
  existeCorreo,
  validarCorreo,
  validarContraseña,
  existeContraseña,
  correoOcupado,
};
