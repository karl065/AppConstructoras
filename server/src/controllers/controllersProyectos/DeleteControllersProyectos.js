//Crearemos la funcion para eliminar el registro de Proyectos
const Proyectos = require("../../models/Proyectos");
const Usuarios = require('../../models/Usuarios');

const deleteControllersProyectos = async (id) => {
    try {
        const eliminarProyecto = await Proyectos.findByIdAndDelete(id);
        if (eliminarProyecto.idUsuario) {
            const usuario = await Usuarios.findById(eliminarProyecto.idUsuario);
            usuario.proyectos.pull(id)
            await usuario.save()
        }
        return eliminarProyecto;
    } catch (error) {
        return error;
    }
}

module.exports = { deleteControllersProyectos }
