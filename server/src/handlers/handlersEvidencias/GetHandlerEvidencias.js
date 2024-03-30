const { getControllerEvidencias } = require("../../controllers/controllersEvidencias/GetControllerEvidencias");

const getHandlerEvidencias = async (req, res) => {
    try {
        const { id, foto, idProyectos, idTareas } = req.query;

        const evidencias = await getControllerEvidencias(
            id,
            foto,
            idProyectos,
            idTareas
        );

        return res.status(200).json(evidencias);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { getHandlerEvidencias };