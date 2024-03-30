const {
  postControllerTareas,
} = require('../../controllers/controllersTareas/PostControllerTareas');

const postHandlerTareas = async (req, res) => {
  try {
    const tarea = req.body;

    const tareaNuevo = await postControllerTareas(tarea);

    return res.status(201).json(tareaNuevo);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { postHandlerTareas };
