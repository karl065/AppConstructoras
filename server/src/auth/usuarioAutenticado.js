const Usuarios = require('../models/Usuarios');

const usuarioAutenticado = async ({id}) => {
  try {
    const usuario = await Usuarios.findById(id)
      .select('-password')
      .populate('notificaciones');
    return usuario;
  } catch (error) {
    return error;
  }
};

module.exports = {usuarioAutenticado};
