const SoporteContable = require('../../models/SoporteContable');
const Proyectos = require('../../models/Proyectos');
const Usuarios = require('../../models/Usuarios');

const postControllerSoporteContable = async (soporteContable) => {
    try {
        const nuevoSoporteContable = await SoporteContable.create(soporteContable);
        if (soporteContable.idProyectos) {
            await Proyectos.findByIdAndUpdate(
                nuevoSoporteContable.idProyectos,
                { $push: { soporteContable: nuevoSoporteContable._id } },
                { new: true }
            );
        }
        if (soporteContable.idUsuario) {
            await Usuarios.findByIdAndUpdate(
                nuevoSoporteContable.idUsuario,
                { $push: { soporteContable: nuevoSoporteContable._id } },
                { new: true }
            );
        }
        return nuevoSoporteContable;
    } catch (error) {
        return error;
    }
}

module.exports = { postControllerSoporteContable };