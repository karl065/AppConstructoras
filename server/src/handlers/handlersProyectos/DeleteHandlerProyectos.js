const { deleteControllersProyectos } = require('../../controllers/controllersProyectos/DeleteControllersProyectos');
//crearemos la funcion para eliminar el registro de Proyectos
const deleteHandlerProyectos = async (req, res) => {
    try {
        const { id } = req.params

        const eliminarProyecto = await deleteControllersProyectos(id);

        res.status(200).json(eliminarProyecto);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { deleteHandlerProyectos }