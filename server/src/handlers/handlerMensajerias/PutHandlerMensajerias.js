const {
  putControllersMensajes,
} = require('../../controllers/controllersMensajerias/PutControllerMensajerias');

const PutHandlerMensajes = async (req, res) => {
  try {
    const {id} = req.params;
    const dataUpdate = req.body;
    const mensajeActualizado = await putControllersMensajes(dataUpdate, id);

    return res.status(200).json(mensajeActualizada);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {PutHandlerMensajes};
