const {
  getControllerUsers,
} = require('../../controllers/controllersUsuarios/GetControllerUsuarios');

const getHandlerUsuarios = async (req, res) => {
  try {
    const {nombre, email, telefono, estado, habilitado, rol, obtenerRoles} =
      req.query;

    const usuarios = await getControllerUsers(
      nombre,
      email,
      telefono,
      rol,
      estado,
      habilitado,
      obtenerRoles
    );

    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {getHandlerUsuarios};
