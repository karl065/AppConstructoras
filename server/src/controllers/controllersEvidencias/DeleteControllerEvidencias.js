const Evidencias = require('../../models/Evidencias');

const deleteControllerEvidencias = async (id) => {
    try {
        const evidenciaEliminada = await Evidencias.findByIdAndDelete(id);

        return evidenciaEliminada;
    } catch (error) {
        return error;
    }
};

module.exports = { deleteControllerEvidencias }; 