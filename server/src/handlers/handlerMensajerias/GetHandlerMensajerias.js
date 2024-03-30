const {
  getControllerMensajes,
} = require('../../controllers/controllersMensajerias/GetControllerMensajerias');

const getHandlerMensajes = async (req, res) => {
  try {
    const {id, mensajes, idRemitente} = req.query;
    const todosMensajes = await getControllerMensajes(
      id,
      mensajes,
      idRemitente
    );
    return res.status(200).json(todosMensajes);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {getHandlerMensajes};
