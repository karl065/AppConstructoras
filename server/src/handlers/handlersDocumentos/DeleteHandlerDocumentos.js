const {
  deleteControllersDocumentos,
} = require('../../controllers/controllersDocumentos/DeleteControllersDocumentos');
const {eliminarArchivo} = require('../../helpers/Cloudinary/Cloudinary');

const deleteHandlerDocumentos = async (req, res) => {
  try {
    const {id} = req.params;

    const {public_id} = req.query;

    await eliminarArchivo(public_id);

    const eliminarDocumento = await deleteControllersDocumentos(id);

    return res.status(200).json(eliminarDocumento);
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
};

module.exports = {deleteHandlerDocumentos};
