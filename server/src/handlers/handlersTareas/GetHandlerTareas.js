const {
  getControllerTareas,
} = require('../../controllers/controllersTareas/GetControllerTareas');

const getHandlerTareas = async (req, res) => {
  try {
    const {
      descripcion,
      fechaInicioRangoIni,
      fechaInicioRangoFin,
      fechaFinRangoIni,
      fechaFinRangoFin,
      estado,
      foto,
      idUsuario,
      idProyectos,
    } = req.query;

    const tareas = await getControllerTareas(
      descripcion,
      fechaInicioRangoIni,
      fechaInicioRangoFin,
      fechaFinRangoIni,
      fechaFinRangoFin,
      estado,
      foto,
      idUsuario,
      idProyectos,
    );

    return res.status(200).json(tareas);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { getHandlerTareas };
