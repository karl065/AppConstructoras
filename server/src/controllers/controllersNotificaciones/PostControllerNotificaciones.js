const Notificaciones = require('../../models/Notificaciones');
const Usuarios = require('../../models/Usuarios');

const postControllerNotificaciones = async (notificaciones) => {
  try {
    const nuevaNotificacion = await Notificaciones.create(notificaciones);

    if (notificaciones.idUsuario) {
      await Usuarios.findByIdAndUpdate(
        notificaciones.idUsuario,
        {$push: {notificaciones: nuevaNotificacion._id}},
        {new: true}
      );
    }
    return nuevaNotificacion;
  } catch (error) {
    return error;
  }
};

module.exports = {postControllerNotificaciones};
