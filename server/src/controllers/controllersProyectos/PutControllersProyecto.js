//Crearemos el controlador para actualizar el proyecto
const Proyectos = require('../../models/Proyectos')

const putControllersProyectos = async (proyecto, id) => {
    try {

        const proyectoActualizado = await Proyectos.findByIdAndUpdate(id, proyecto, { new: true })

        return proyectoActualizado

    } catch (error) {
        return error
    }
}

module.exports = { putControllersProyectos }
