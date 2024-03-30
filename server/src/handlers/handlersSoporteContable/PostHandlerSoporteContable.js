const { postControllerSoporteContable } = require("../../controllers/controllersSoporteContable/PostControllerSoporteContable");


const postHandlerSoporteContable = async (req, res) => {
    try {
        const soporteContable = req.body;

        const nuevoSoporteContable = await postControllerSoporteContable(soporteContable);

        res.status(201).send(nuevoSoporteContable);

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

module.exports = { postHandlerSoporteContable };