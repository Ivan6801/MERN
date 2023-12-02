import Usuarios from "../models/Usuario.js";

const registrar = async (req, res) => {
  // Evitar registros duplicados

  const { email } = req.body;
  const existeUsuario = await Usuarios.findOne({ email });

  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuarios(req.body);
    const usuarioAlmacenado = await usuario.save();
    res.json(usuarioAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

export { registrar };
