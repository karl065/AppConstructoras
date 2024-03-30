const {
    deleteControllerEvidencias,
} = require('../../controllers/controllersEvidencias/DeleteControllerEvidencias');

const DeleteHandlerEvidencias = async (req, res) => {
    try {
        const { id } = req.params;

        const evidenciaBorrada = await deleteControllerEvidencias(id);

        return res.status(200).json(evidenciaBorrada);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

module.exports = { DeleteHandlerEvidencias };