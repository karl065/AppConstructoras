const {
  postControllerObservaciones,
} = require('../../controllers/controllersObservaciones/PostControllerObservaciones');

const postHandlerObservaciones = async (req, res) => {
  try {
    const observaciones = req.body;
    const observacionCreada = await postControllerObservaciones(observaciones);
    return res.status(200).json(observacionCreada);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {postHandlerObservaciones};
