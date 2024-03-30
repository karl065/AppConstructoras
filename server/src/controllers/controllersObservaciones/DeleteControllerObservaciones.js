const Observaciones = require('../../models/Observaciones');
const Proyectos = require('../../models/Proyectos');
const Tareas = require('../../models/Tareas');

const deleteControllerObservaciones = async (id) => {
  try {
    const observacionEliminada = await Observaciones.findByIdAndDelete(id);
    if (observacionEliminada.idProyectos) {
      const proyecto = await Proyectos.findById(
        observacionEliminada.idProyectos
      );
      proyecto.observaciones.pull(id);
      await proyecto.save();
    }
    if (observacionEliminada.idTareas) {
      const tarea = await Tareas.findById(observacionEliminada.idTareas);
      tarea.observaciones.pull(id);
      await tarea.save();
    }

    return observacionEliminada;
  } catch (error) {
    return error;
  }
};

module.exports = {deleteControllerObservaciones};
