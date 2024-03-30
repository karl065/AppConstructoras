const { deleteControllerSoporteContable } = require('../../controllers/controllersSoporteContable/DeleteControllerSoporteContable');

const deleteHandlerSoporteContable = async (req, res) => {
    try {
        const { id } = req.params;
        const soporteContable = await deleteControllerSoporteContable(id);
        return res.status(200).json(soporteContable);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { deleteHandlerSoporteContable };