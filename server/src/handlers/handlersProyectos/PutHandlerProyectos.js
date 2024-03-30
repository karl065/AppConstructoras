
const { putControllersProyectos } = require('../../controllers/controllersProyectos/PutControllersProyecto')

const putHandlerProyecto = async (req, res) => {
    try {
        const { id } = req.params
        const proyecto = req.body

        const actualizarProyecto = await putControllersProyectos(proyecto, id)

        res.status(200).json(actualizarProyecto)

    } catch (error) {
        res.statuos(500).json({ message: error })
    }
}

module.exports = { putHandlerProyecto }
