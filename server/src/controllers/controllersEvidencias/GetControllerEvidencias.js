const Evidencias = require('../../models/Evidencias');

const getControllerEvidencias = async (id, idProyectos, idTareas) => {
    try {
        const whereConditions = {
            ...(idProyectos && { idProyectos }),
            ...(idTareas && { idTareas }),
        };

        if (id) {
            const evidencia = await Evidencias.findById(id);
            return evidencia;
        }

        const evidencias = await Evidencias.find(
            Object.keys(whereConditions).length > 0 ? whereConditions : {}
        );

        return evidencias;
    } catch (error) {
        return error;
    }
};

module.exports = { getControllerEvidencias };