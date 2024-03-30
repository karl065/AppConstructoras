const SoporContable = require('../../models/SoporteContable');
const Proyectos = require('../../models/Proyectos');
const Usuarios = require('../../models/Usuarios');

const deleteControllerSoporteContable = async (idSoporteContable) => {
    try {
        const soporteContable = await SoporContable.findById(idSoporteContable);

        await SoporContable.findByIdAndDelete(idSoporteContable);

        if (soporteContable.idUsuario) {
            const usuario = await Usuarios.findById(soporteContable.idUsuario);
            if (usuario) {
                usuario.soporteContable.pull(idSoporteContable);
                await usuario.save();
            }
        }
        if (soporteContable.idProyectos) {
            const proyecto = await Proyectos.findById(soporteContable.idProyectos);
            proyecto.soporteContable.pull(idSoporteContable);
            await proyecto.save();
        }
        return soporteContable;
    } catch (error) {
        return error;
    }
}

module.exports = { deleteControllerSoporteContable };