const Observaciones = require('../../models/Observaciones');

const putControllersObservaciones = async (observacion, id) => {
  try {
    const observacionActualizada = await Observaciones.findByIdAndUpdate(
      id,
      observacion,
      {new: true}
    );

    return observacionActualizada;
  } catch (error) {
    return error;
  }
};

module.exports = {putControllersObservaciones};
