const {
  postControllersDocumentos,
} = require('../../controllers/controllersDocumentos/PostControllersDocumentos');
const {subirArchivo} = require('../../helpers/Cloudinary/Cloudinary');
const fs = require('fs');

const postHandlerDocumentos = async (req, res) => {
  try {
    const documento = req.body;
    const {tipo} = req.query;

    let nombreArchivo = req.files.archivo.name.split(`.`)[0];
    if (nombreArchivo.includes('(')) {
      nombreArchivo = nombreArchivo.split('(')[0].trim();
    }

    const url = await subirArchivo({
      tipo,
      nombre: nombreArchivo,
      archivo: req.files.archivo.tempFilePath,
    });

    fs.unlink(req.files.archivo.tempFilePath, (err) => {
      if (err) {
        console.error('Error al eliminar el archivo temporal:', err);
      } else {
        console.log('Archivo temporal eliminado correctamente:');
      }
    });

    documento.archivo = url;

    const documentoNuevo = await postControllersDocumentos(documento);

    return res.status(200).json(documentoNuevo);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {postHandlerDocumentos};
