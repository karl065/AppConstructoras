const Tareas = require('../../models/Tareas');
const Proyectos = require('../../models/Proyectos');
const Usuarios = require('../../models/Usuarios');

const putControllerTareas = async (updateTarea, idTarea) => {
  try {
    if (updateTarea.idProyectos) {
      const tarea = await Tareas.findById(idTarea);
      const proyectoActual = tarea.idProyectos.toString();

      if (proyectoActual !== updateTarea.idProyectos) {
        // Remover la tarea del proyecto actual
        if (proyectoActual) {
          await Proyectos.findByIdAndUpdate(proyectoActual, {
            $pull: {tareas: idTarea},
          });
        }

        // Agregar la tarea al nuevo proyecto
        await Proyectos.findByIdAndUpdate(updateTarea.idProyectos, {
          $addToSet: {tareas: idTarea},
        });
      }
    }

    if (updateTarea.idUsuario) {
      const tarea = await Tareas.findById(idTarea);
      const usuarioActual = tarea.idUsuario.toString();

      if (usuarioActual !== updateTarea.idUsuario) {
        // Remover la tarea del usuario actual
        if (usuarioActual) {
          await Usuarios.findByIdAndUpdate(usuarioActual, {
            $pull: {tareas: idTarea},
          });
        }

        // Agregar la tarea al nuevo usuario
        await Usuarios.findByIdAndUpdate(updateTarea.idUsuario, {
          $addToSet: {tareas: idTarea},
        });
      }
    }

    // Actualizar la tarea
    await Tareas.findByIdAndUpdate(idTarea, updateTarea);

    // Devolver la tarea actualizada
    const tareaActualizada = await Tareas.findById(idTarea);
    return tareaActualizada;
  } catch (error) {
    return error;
  }
};

module.exports = {putControllerTareas};
