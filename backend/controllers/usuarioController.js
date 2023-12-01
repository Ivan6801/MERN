import Usuarios from "../models/Usuario.js";

const registrar = async (req, res) => {
  try {
    const usuario = new Usuarios(req.body);
    const usuarioAlmacenado = await usuario.save();
    res.json(usuarioAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

export { registrar };
