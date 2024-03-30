const {
  postControllerMensajes,
} = require('../../controllers/controllersMensajerias/PostControllerMensajeria');

const postHandlerMensajes = async (req, res) => {
  try {
    const mensajes = req.body;
    const mensajeCreado = await postControllerMensajes(mensajes);
    return res.status(200).json(mensajeCreado);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {postHandlerMensajes};
