const User = require("../models/users");

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find();

    res.json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error de Servidor" });
  }
};

const obtenerUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await User.findById(id);
    res.json(usuario);

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error de Servidor" });
  }
};

const crearUsuario = async (req, res) => {
  try {
    const { body } = req;

    const usuario = new User(body);

    await usuario.save();

    res.status(201).json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error de Servidor" });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { rol,contraseña,...resto } = req.body

    const usuario = await User.findByIdAndUpdate(id, resto, { new: true });

    res.json({ msg: "Usuario actualizado", usuario });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error de Servidor" });
  }
};

const borrarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await User.findByIdAndDelete(id);

    res.json({ msg: `Usuario ${usuario.nombre} eliminado ` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error de Servidor" });
  }
};

module.exports = {
  obtenerUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
};
