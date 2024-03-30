const Observaciones = require('../../models/Observaciones');
const Proyectos = require('../../models/Proyectos');
const Tareas = require('../../models/Tareas');
const {
  putControllerTareas,
} = require('../controllersTareas/PutControllerTareas');

const postControllerObservaciones = async (observaciones) => {
  try {
    const nuevaObservacion = await Observaciones.create(observaciones);

    if (observaciones.idProyectos) {
      await Proyectos.findByIdAndUpdate(
        observaciones.idProyectos,
        {$push: {observaciones: nuevaObservacion._id}},
        {new: true}
      );
    }

    if (observaciones.idTareas) {
      await Tareas.findByIdAndUpdate(
        observaciones.idTareas,
        {$push: {observaciones: nuevaObservacion._id}},
        {new: true}
      );
    }
    return nuevaObservacion;
  } catch (error) {
    return error;
  }
};

module.exports = {postControllerObservaciones};
