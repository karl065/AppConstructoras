const {
  getControllerProyectos,
} = require('../../controllers/controllersProyectos/GetControllersProyectos');

const getHandlerProyectos = async (req, res) => {
  try {
    const {
      id,
      nombreProyecto,
      departamento,
      ciudad,
      descripcion,
      fechaInicioRangoIni,
      fechaInicioRangoFin,
      fechaFinRangoIni,
      fechaFinRangoFin,
    } = req.query;

    const proyectos = await getControllerProyectos(
      id,
      nombreProyecto,
      departamento,
      ciudad,
      descripcion,
      fechaInicioRangoIni,
      fechaInicioRangoFin,
      fechaFinRangoIni,
      fechaFinRangoFin
    );

    return res.status(200).json(proyectos);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = {getHandlerProyectos};
