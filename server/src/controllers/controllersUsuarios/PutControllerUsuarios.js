const Usuarios = require('../../models/Usuarios');
const Tareas = require('../../models/Tareas'); // Importa el modelo de tareas
const Proyectos = require('../../models/Proyectos'); // Importa el modelo de proyectos
const bcryptjs = require('bcryptjs');

const putControllerUsuarios = async (updateUser, idUser) => {
  try {
    if (updateUser.password) {
      updateUser.password = await bcryptjs.hash(updateUser.password, 10);
    }

    // Elimina la referencia en la tarea (si se proporciona) si existe en otro usuario
    if (updateUser.tareas) {
      const tarea = await Tareas.findOne({
        _id: updateUser.tareas,
        idUsuario: {$ne: idUser},
      });
      if (tarea) {
        await Usuarios.updateMany(
          {tareas: updateUser.tareas}, // Busca usuarios que tengan la tarea
          {$pull: {tareas: updateUser.tareas}} // Elimina la tarea del array de tareas
        );
      }
    }

    // Elimina la referencia en el proyecto (si se proporciona) si existe en otro usuario
    if (updateUser.proyectos) {
      const proyecto = await Proyectos.findOne({
        _id: updateUser.proyectos,
        idUsuario: {$ne: idUser},
      });
      if (proyecto) {
        await Usuarios.updateMany(
          {proyectos: updateUser.proyectos}, // Busca usuarios que tengan el proyecto
          {$pull: {proyectos: updateUser.proyectos}} // Elimina el proyecto del array de proyectos
        );
      }
    }
    // Actualiza el usuario
    await Usuarios.updateOne({_id: idUser}, updateUser);

    // Retorna el usuario actualizado
    const usuario = await Usuarios.findById(idUser, {password: 0});
    return usuario;
  } catch (error) {
    return error;
  }
};

module.exports = {putControllerUsuarios};
