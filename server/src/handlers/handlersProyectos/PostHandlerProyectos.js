const {postControllerProyectos} = require('../../controllers/controllersProyectos/PostControllerProyectos');

const postHandlerProyectos = async (req, res) => {
    try {
        const proyecto = req.body

        const proyectoNuevo = await postControllerProyectos(proyecto);

        res.status(201).json(proyectoNuevo);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { postHandlerProyectos}