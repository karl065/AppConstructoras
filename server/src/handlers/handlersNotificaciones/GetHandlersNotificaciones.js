const {
  getControllerNotificaciones,
} = require('../../controllers/controllersNotificaciones/GetControllerNotificaciones');

const getHandlerNotificaciones = async (req, res) => {
  try {
    const {id} = req.query;

    const notificaciones = await getControllerNotificaciones(id);

    return res.status(200).json(notificaciones);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {getHandlerNotificaciones};
