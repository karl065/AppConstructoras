const Proyectos = require('../../models/Proyectos');

const getControllerProyectos = async (
  id,
  nombreProyecto,
  departamento,
  ciudad,
  descripcion,
  fechaInicioRangoIni,
  fechaInicioRangoFin,
  fechaFinRangoIni,
  fechaFinRangoFin
) => {
  try {
    if (id) {
      const proyecto = await Proyectos.findById(id);
      return [proyecto];
    }

    const whereConditions = {
      ...(nombreProyecto && {
        nombreProyecto: new RegExp(`^${nombreProyecto}`, 'i'),
      }),
      ...(departamento && {departamento: new RegExp(`^${departamento}`, 'i')}),
      ...(ciudad && {ciudad: new RegExp(`^${ciudad}`, 'i')}),
      ...(descripcion && {descripcion: new RegExp(`^${descripcion}`, 'i')}),
      ...(fechaInicioRangoIni &&
        fechaInicioRangoFin && {
          fechaInicio: {
            $gte: fechaInicioRangoIni,
            $lte: fechaInicioRangoFin,
          },
        }),
      ...(fechaInicioRangoIni &&
        !fechaInicioRangoFin && {fechaInicio: {$gte: fechaInicioRangoIni}}),
      ...(fechaInicioRangoFin &&
        !fechaInicioRangoIni && {fechaInicio: {$lte: fechaInicioRangoFin}}),
      ...(fechaFinRangoIni &&
        fechaFinRangoFin && {
          fechaFin: {
            $gte: fechaFinRangoIni,
            $lte: fechaFinRangoFin,
          },
        }),
      ...(fechaFinRangoIni &&
        !fechaFinRangoFin && {fechaFin: {$gte: fechaFinRangoIni}}),
      ...(fechaFinRangoFin &&
        !fechaFinRangoIni && {fechaFin: {$lte: fechaFinRangoFin}}),
    };

    const proyectos = await Proyectos.find(
      Object.keys(whereConditions).length > 0 ? whereConditions : {}
    )
      .populate('observaciones')
      .populate('tareas')
      .populate('soporteContable')
      .populate('documentos');
    return proyectos;
  } catch (error) {
    return error;
  }
};
module.exports = {getControllerProyectos};
