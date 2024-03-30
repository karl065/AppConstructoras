const {
  putControllerDocumentos,
} = require('../../controllers/controllersDocumentos/PutControllersDocumentos');

const putHandlerDocumento = async (req, res) => {
  try {
    const documento = req.body;
    const {id} = req.params;

    const documentoActualizado = await putControllerDocumentos(documento, id);

    return res.status(200).json(documentoActualizado);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {putHandlerDocumento};
