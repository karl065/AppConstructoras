const Tareas = require('../../models/Tareas');

const getControllerTareas = async (
  descripcion,
  fechaInicioRangoIni,
  fechaInicioRangoFin,
  fechaFinRangoIni,
  fechaFinRangoFin,
  estado,
  foto,
  idUsuario,
  idProyectos
) => {
  try {
    const whereConditions = {
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
          fechaVencimiento: {
            $gte: fechaFinRangoIni,
            $lte: fechaFinRangoFin,
          },
        }),
      ...(fechaFinRangoIni &&
        !fechaFinRangoFin && {fechaVencimiento: {$gte: fechaFinRangoIni}}),
      ...(fechaFinRangoFin &&
        !fechaFinRangoIni && {fechaVencimiento: {$lte: fechaFinRangoFin}}),
      ...(estado && {estado}),
      ...(foto && {foto}),
      ...(idUsuario && {idUsuario}),
      ...(idProyectos && {idProyectos}),
    };

    const tareas = await Tareas.find(
      Object.keys(whereConditions).length > 0 ? whereConditions : {}
    )
      .populate('idUsuario')
      .populate('idProyectos')
      .populate('observaciones')
      .populate('evidencias');

    return tareas;
  } catch (error) {
    return error;
  }
};

module.exports = {getControllerTareas};
