const {
  deleteControllerTareas,
} = require('../../controllers/controllersTareas/DeleteControllerTareas');

const deleteHandlerTareas = async (req, res) => {
  try {
    const {id} = req.params;
    const tarea = await deleteControllerTareas(id);
    return res.status(200).json(tarea);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {deleteHandlerTareas};
