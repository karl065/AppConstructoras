const Evidencias = require('../../models/Evidencias');
const Tareas = require('../../models/Tareas');
const Proyectos = require('../../models/Proyectos');

const postControllerEvidencias = async (evidencias) => {
  try {
    const nuevaEvidencia = await Evidencias.create(evidencias);

    if (evidencias.idProyecto) {
      await Proyectos.findByIdAndUpdate(
        evidencias.idProyecto,
        {$push: {evidencias: nuevaEvidencia._id}},
        {new: true}
      );
    }
    if (evidencias.idTarea) {
      await Tareas.findByIdAndUpdate(
        evidencias.idTarea,
        {$push: {evidencias: nuevaEvidencia._id}},
        {new: true}
      );
    }

    return nuevaEvidencia;
  } catch (error) {
    return error;
  }
};

module.exports = {postControllerEvidencias};
