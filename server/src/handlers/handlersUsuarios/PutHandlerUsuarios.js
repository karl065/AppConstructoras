const {
  putControllerUsuarios,
} = require('../../controllers/controllersUsuarios/PutControllerUsuarios');
const {
  subirArchivo,
  eliminarArchivo,
} = require('../../helpers/Cloudinary/Cloudinary');
const fs = require('fs');

const putHandlerUsuarios = async (req, res) => {
  try {
    const {id} = req.params;
    const updateUser = req.body;

    const {tipo, public_id} = req.query;

    if (public_id) {
      await eliminarArchivo(public_id);

      let nombreArchivo = req.files.foto.name.split(`.`)[0];
      if (nombreArchivo.includes('(')) {
        nombreArchivo = nombreArchivo.split('(')[0].trim();
      }

      const url = await subirArchivo({
        tipo,
        nombre: nombreArchivo,
        archivo: req.files.foto.tempFilePath,
      });

      fs.unlink(req.files.foto.tempFilePath, (err) => {
        if (err) {
          console.error('Error al eliminar el archivo temporal:', err);
        } else {
          console.log('Archivo temporal eliminado correctamente:');
        }
      });

      updateUser.foto = url;
    }
    const userUpdated = await putControllerUsuarios(updateUser, id);
    return res.status(200).json(userUpdated);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {putHandlerUsuarios};
