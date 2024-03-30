const Evidencias = require('../../models/Evidencias');

const putControllersEvidencias = async (evidencias, id) => {
    try {
        const evidenciaActualizada = await Evidencias.findByIdAndUpdate(
            id,
            evidencias,
            { new: true }
        );

        return evidenciaActualizada;
    } catch (error) {
        return error;
    }
};

module.exports = { putControllersEvidencias };