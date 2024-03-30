const {
  deleteControllerObservaciones,
} = require('../../controllers/controllersObservaciones/DeleteControllerObservaciones');

const DeleteHandlerObservaciones = async (req, res) => {
  try {
    const {id} = req.params;

    const observacionBorrada = await deleteControllerObservaciones(id);

    return res.status(200).json(observacionBorrada);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {DeleteHandlerObservaciones};
