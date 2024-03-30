const {
    putControllersEvidencias,
} = require('../../controllers/controllersEvidencias/PutControllerEvidencias');
const {
    subirArchivo,
    eliminarArchivo,
} = require('../../helpers/Cloudinary/Cloudinary');
const fs = require('fs');

const putHandlerEvidencias = async (req, res) => {
    try {
        const { id } = req.params;
        const updateEvidencia = req.body;

        const { tipo, public_id } = req.query;

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

            updateEvidencia.foto = url;
        }
        const evidenciaUpdated = await putControllersEvidencias(updateEvidencia, id);
        return res.status(200).json(evidenciaUpdated);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { putHandlerEvidencias };
