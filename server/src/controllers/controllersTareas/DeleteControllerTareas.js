const Tareas = require('../../models/Tareas');
const Usuarios = require('../../models/Usuarios');
const Proyectos = require('../../models/Proyectos');

const deleteControllerTareas = async (idTarea) => {
  try {
    const tarea = await Tareas.findById(idTarea);

    await Tareas.findByIdAndDelete(idTarea);

    if (tarea.idUsuario) {
      const usuario = await Usuarios.findById(tarea.idUsuario);
      if (usuario) {
        usuario.tareas.pull(idTarea);
        await usuario.save();
      }
    }

    if (tarea.idProyectos) {
      const proyecto = await Proyectos.findById(tarea.idProyectos);
      proyecto.tareas.pull(idTarea);
      await proyecto.save();
    }

    return tarea;
  } catch (error) {
    return error;
  }
};

module.exports = { deleteControllerTareas };
