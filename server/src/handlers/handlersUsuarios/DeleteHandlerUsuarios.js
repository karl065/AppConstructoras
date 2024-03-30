const {
  deleteControllerUsuarios,
} = require('../../controllers/controllersUsuarios/DeleteControllerUsuarios');
const {eliminarArchivo} = require('../../helpers/Cloudinary/Cloudinary');

const deleteHandlerUsuarios = async (req, res) => {
  try {
    const {id} = req.params;

    const {public_id} = req.query;

    await eliminarArchivo(public_id);

    const usuario = await deleteControllerUsuarios(id);
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {deleteHandlerUsuarios};
