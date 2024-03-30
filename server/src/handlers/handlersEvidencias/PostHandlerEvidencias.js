const {
    postControllerEvidencias,
} = require('../../controllers/controllersEvidencias/PostControllerEvidencias');
const { subirArchivo } = require('../../helpers/Cloudinary/Cloudinary');
const fs = require('fs');

const postHandlerEvidencias = async (req, res) => {
    try {
        const evidencia = req.body;
        const { tipo } = req.query;

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

        evidencia.foto = url;

        const evidenciaNuevo = await postControllerEvidencias(evidencia);

        return res.status(201).json(evidenciaNuevo);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { postHandlerEvidencias };
