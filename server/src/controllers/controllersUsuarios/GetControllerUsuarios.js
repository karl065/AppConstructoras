const Usuarios = require('../../models/Usuarios');

const getControllerUsers = async (
  nombre,
  email,
  telefono,
  rol,
  estado,
  habilitado,
  obtenerRoles
) => {
  try {
    if (obtenerRoles) {
      const rolesEnum = await Usuarios.schema.path('rol').enumValues;
      return rolesEnum;
    }

    const whereConditions = {
      ...(nombre && {nombre: new RegExp(`^${nombre}`, 'i')}),
      ...(email && {email: new RegExp(`^${email}`, 'i')}),
      ...(telefono && {telefono: new RegExp(`^${telefono}`, 'i')}),
      ...(estado && {estado}),
      ...(habilitado && {habilitado}),
      ...(rol && {rol}),
    };

    const usuarios = await Usuarios.find(
      Object.keys(whereConditions).length > 0 ? whereConditions : {},
      {password: 0}
    )
      .populate('proyectos')
      .populate('tareas')
      .populate('notificaciones')
      .populate('mensajesRecibidos')
      .populate('mensajesEnviados');

    return usuarios;
  } catch (error) {
    return error;
  }
};

module.exports = {getControllerUsers};
