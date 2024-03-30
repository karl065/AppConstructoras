const Mensajes = require('../../models/Mensajerias');

const putControllersMensajes = async (mensajes, id) => {
  try {
    const mensajeActualizado = await Mensajes.findByIdAndUpdate(id, mensajes, {
      new: true,
    });

    return mensajeActualizado;
  } catch (error) {
    return error;
  }
};

module.exports = {putControllersMensajes};
