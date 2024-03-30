const cloudinary = require('cloudinary');
const { CLOUD_NAME, APIKEYCLOUD, APISECRETCLOUD, PRESET } = process.env;

cloudinary.v2.config({
  cloud_name: CLOUD_NAME,
  api_key: APIKEYCLOUD,
  api_secret: APISECRETCLOUD,
  secure: true,
});

const subirArchivo = async (archivos) => {
  try {
    let options;
    const { tipo, archivo, nombre } = archivos;
    if (tipo === 'PDF') {
      options = {
        folder: 'AppGrupoJM/Documentos',
        public_id: nombre,
        display_name: nombre,
        unique_filename: true,
      };
    } else {
      options = {
        folder: 'AppGrupoJM/IMGUsuarios',
        public_id: nombre,
        display_name: nombre,
        unique_filename: true,
      };
    }
    const url = await cloudinary.uploader.upload(archivo, PRESET, options);

    return url.secure_url;
  } catch (error) {
    return error;
  }
};

const eliminarArchivo = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = { subirArchivo, eliminarArchivo };
