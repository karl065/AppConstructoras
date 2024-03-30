
const { getControllerSoporteContable } = require('../../controllers/controllersSoporteContable/GetControllerSoporteContable')

const getHandlerSoporteContable = async (req, res) => {
    try {
        const { nombre,
            descripcion,
            fecha,
            archivo,
            valor, } = req.query

        const soportes = await getControllerSoporteContable(
            nombre,
            descripcion,
            fecha,
            archivo,
            valor,)

        return res.status(200).json(soportes)

    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = { getHandlerSoporteContable }  