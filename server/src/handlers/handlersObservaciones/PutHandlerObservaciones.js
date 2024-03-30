const {
  putControllersObservaciones,
} = require('../../controllers/controllersObservaciones/PutControllerObservaciones');

const PutHandlerObservaciones = async (req, res) => {
  try {
    const {id} = req.params;
    const dataUpdate = req.body;
    const observacionActualizada = await putControllersObservaciones(
      dataUpdate,
      id
    );

    return res.status(200).json(observacionActualizada);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {PutHandlerObservaciones};
