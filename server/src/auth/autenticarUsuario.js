const Usuarios = require('../models/Usuarios');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {SECRETA} = process.env;

const autenticarUsuario = async (email, password) => {
  try {
    const usuario = await Usuarios.findOne({
      email: {$regex: new RegExp('^' + email + '$', 'i')},
    });
    if (!usuario) {
      throw new Error('Email o Contraseña incorrectos');
    }

    const validarContraseña = await bcryptjs.compare(
      password,
      usuario.password
    );

    if (!usuario.habilitado) {
      throw new Error(
        `El usuario ${email} esta inhabilitado, por favor contacte a su  administrador`
      );
    }

    if (!usuario || !validarContraseña) {
      throw new Error('Email o Contraseña incorrectos');
    }

    const usuarioLogeado = await Usuarios.findByIdAndUpdate(
      usuario._id,
      {estado: true},
      {new: true} // Esta opción devuelve el documento actualizado
    );

    const payload = {
      user: {
        id: usuario._id,
      },
    };

    return new Promise((resolve, reject) => [
      jwt.sign(
        payload,
        SECRETA,
        {
          expiresIn: '2h',
        },
        (err, token) => {
          if (err) reject({msg: 'Error al crear el token'});
          const auth = {
            token,
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            telefono: usuario.telefono,
            foto: usuario.foto,
            rol: usuario.rol,
            estado: usuarioLogeado.estado,
          };
          resolve(auth);
        }
      ),
    ]);
  } catch (error) {
    throw error.message;
  }
};

module.exports = {autenticarUsuario};
