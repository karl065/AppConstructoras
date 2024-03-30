const Usuarios = require('../../models/Usuarios');
const Proyectos = require('../../models/Proyectos');
const Tareas = require('../../models/Tareas');

const deleteControllerUsuarios = async (idUser) => {
  try {
    // Encontrar el usuario a eliminar
    const usuario = await Usuarios.findById(idUser, {password: 0});

    // Eliminar el usuario
    await Usuarios.findByIdAndDelete(idUser);

    // Eliminar las referencias del usuario eliminado en otros modelos
    // Eliminar las referencias del usuario en el modelo Proyectos
    await Proyectos.updateMany({usuarios: idUser}, {$pull: {usuarios: idUser}});

    // Eliminar las referencias del usuario en el modelo Tareas
    await Tareas.updateMany({usuario: idUser}, {$unset: {usuario: ''}});

    return usuario;
  } catch (error) {
    return error;
  }
};

module.exports = {deleteControllerUsuarios};
