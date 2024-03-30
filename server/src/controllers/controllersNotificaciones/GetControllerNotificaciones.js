const Notificaciones = require('../../models/Notificaciones');

const getControllerNotificaciones = async () => {
  try {
    const notificaciones = await Notificaciones.find();
    // .populate('usuarios')
    // .populate('leidoPor');
    return notificaciones;
  } catch (error) {
    return error;
  }
};

module.exports = {getControllerNotificaciones};
