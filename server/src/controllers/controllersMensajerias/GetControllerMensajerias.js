const Mensajes = require('../../models/Mensajerias');

const getControllerMensajes = async (id, mensajes, idRemitente) => {
  try {
    if (id) {
      const mensajes = await Mensajes.findById(id);
      return mensajes;
    }
    const whereConditions = {
      ...(id && {id}),
      ...(mensajes && {mensajes: new RegExp(`^${mensajes}`, 'i')}),
      ...(idRemitente && {idRemitente}),
    };

    const mensajes = await Mensajes.find(
      Object.keys(whereConditions).length > 0 ? whereConditions : {}
    );

    return mensajes;
  } catch (error) {
    return error;
  }
};

module.exports = {getControllerMensajes};
