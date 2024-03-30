const SoporteContable = require('../../models/SoporteContable');

const getControllerSoporteContable = async (
  nombre,
  descripcion,
  fecha,
  archivo,
  valor
) => {
  try {
    const whereConditions = {
      ...(nombre && {nombre: new RegExp(`^${nombre}`, 'i')}),
      ...(descripcion && {descripcion: new RegExp(descripcion, 'i')}),
      ...(fecha && {fecha}),
      ...(archivo && {archivo: new RegExp(archivo, 'i')}),
      ...(valor && {valor: new RegExp(valor, 'i')}),
    };

    const soporteContable = await SoporteContable.find(
      Object.keys(whereConditions).length > 0 ? whereConditions : {}
    );

    return soporteContable;
  } catch (error) {
    return error;
  }
};

module.exports = {getControllerSoporteContable};
