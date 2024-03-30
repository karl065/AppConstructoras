const Documentos = require('../../models/Documentos');

const getControllersDocumentos = async (
  nombre,
  descripcion,
  fechaInicio,
  fechaFin,
  idProyecto
) => {
  try {
    const whereConditions = {
      ...(nombre && {nombre: new RegExp(`^${nombre}`, 'i')}),
      ...(descripcion && {descripcion: new RegExp(`^${descripcion}`, 'i')}),
      ...(fechaInicio &&
        fechaFin && {
          $or: [{createdAt: {$gte: fechaInicio, $lte: fechaFin}}],
        }),
      ...(fechaInicio && !fechaFin && {createdAt: {$gte: fechaInicio}}),
      ...(fechaFin && !fechaInicio && {createdAt: {$lte: fechaFin}}),
      ...(idProyecto && {idProyecto}),
    };

    const documentos = await Documentos.find(
      Object.keys(whereConditions).length > 0 ? whereConditions : {}
    ).populate('idProyecto');
    return documentos;
  } catch (error) {
    return error;
  }
};

module.exports = {getControllersDocumentos};
