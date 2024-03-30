const Usuarios = require('../../models/Usuarios');
const bcryptjs = require('bcryptjs');

const postControllerUsuarios = async (usuario) => {
  try {
    const verificarEmail = await Usuarios.findOne({email: usuario.email});
    if (verificarEmail) {
      return 'El correo electrónico ya está registrado';
    }
    const {password} = usuario;

    const passCrypt = await bcryptjs.hash(password, 10);

    usuario.password = passCrypt;

    const nuevoUsuario = await Usuarios.create(usuario);
    const usuarioPlano = nuevoUsuario.toObject();
    delete usuarioPlano.password;

    return usuarioPlano;
  } catch (error) {
    return error;
  }
};

module.exports = {postControllerUsuarios};
