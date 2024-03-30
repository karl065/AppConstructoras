const Observaciones = require('../../models/Observaciones');

const getControllerObservaciones = async (id, idProyectos, idTareas) => {
  try {
    const whereConditions = {
      ...(idProyectos && {idProyectos}),
      ...(idTareas && {idTareas}),
    };

    if (id) {
      const observacion = await Observaciones.findById(id);
      return observacion;
    }

    const observaciones = await Observaciones.find(
      Object.keys(whereConditions).length > 0 ? whereConditions : {}
    );

    return observaciones;
  } catch (error) {
    return error;
  }
};

module.exports = {getControllerObservaciones};
