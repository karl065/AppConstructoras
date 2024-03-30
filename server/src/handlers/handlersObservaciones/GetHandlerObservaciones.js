const {
  getControllerObservaciones,
} = require('../../controllers/controllersObservaciones/GetControllerObservaciones');

const getHandlerObservaciones = async (req, res) => {
  try {
    const {id, idProyectos, idTareas} = req.query;

    const Observaciones = await getControllerObservaciones(
      id,
      idProyectos,
      idTareas
    );

    return res.status(200).json(Observaciones);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {getHandlerObservaciones};
