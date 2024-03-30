const Tareas = require('../../models/Tareas');
const Usuarios = require('../../models/Usuarios');
const Proyectos = require('../../models/Proyectos');

const postControllerTareas = async (tarea) => {
  try {
    const nuevaTarea = await Tareas.create(tarea);
    if (tarea.idUsuario) {
      await Usuarios.findByIdAndUpdate(
        nuevaTarea.idUsuario,
        {$push: {tareas: nuevaTarea._id}},
        {new: true}
      );
    }
    if (tarea.idProyectos) {
      await Proyectos.findByIdAndUpdate(
        nuevaTarea.idProyectos,
        {$push: {tareas: nuevaTarea._id}},
        {new: true}
      );
    }
    return nuevaTarea;
  } catch (error) {
    return error;
  }
};

module.exports = {postControllerTareas};
