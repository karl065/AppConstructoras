const Documentos = require('../../models/Documentos');

const putControllerDocumentos = async (documento, id) => {
    try {
        //Actualizamos el registro de la colección Documentos
        const actualizarDocumento = await Documentos.findByIdAndUpdate(id, documento, { new: true });

        return actualizarDocumento;

    } catch (error) {
        return error
    }
}

module.exports = { putControllerDocumentos }
