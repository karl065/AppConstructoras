const SoporteContable = require('../../models/SoporteContable')

const putControllerSoporSoporteContable = async (updateSoportecontable, idSoporte) => {
    try {
        await SoporteContable.updateOne({ _id: idSoporte }, updateSoportecontable)

        const soportecontable = SoporteContable.findById(idSoporte)

        return soportecontable
    } catch (error) {
        return error
    }
}

module.exports = { putControllerSoporSoporteContable }