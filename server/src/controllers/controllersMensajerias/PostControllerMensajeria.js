const Mensajes = require('../../models/Mensajerias');
const Usuarios = require('../../models/Usuarios');

const postControllerMensajes = async (mensajes) => {
  try {
    const nuevoMensaje = await Mensajes.create(mensajes);

    if (mensajes.idRemitente) {
      await Usuarios.findByIdAndUpdate(
        mensajes.idRemitente,
        {$push: {mensajesRecibidos: nuevoMensaje._id}},
        {new: true}
      );
    }
    if (mensajes.idDestinatario) {
      await Usuarios.findByIdAndUpdate(
        mensajes.idDestinatario,
        {$push: {mensajesEnviados: nuevoMensaje._id}},
        {new: true}
      );
    }

    return nuevoMensaje;
  } catch (error) {
    return error;
  }
};

module.exports = {postControllerMensajes};
