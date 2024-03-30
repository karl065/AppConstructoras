const { putControllerSoporSoporteContable } = require('../../controllers/controllersSoporteContable/PutControllerSoporteContable')

const putHandlerSoporteContable = async (req, res) => {
    try {
        const { id } = req.params
        const updateSoportecontable = req.body

        const actualizaroporte = await putControllerSoporSoporteContable(updateSoportecontable, id)

        return res.status(200).json(actualizaroporte)
    } catch (error) {
        return error
    }
}

module.exports = { putHandlerSoporteContable }