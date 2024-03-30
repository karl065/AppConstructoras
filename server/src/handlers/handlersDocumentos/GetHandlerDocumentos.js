const {
  getControllersDocumentos,
} = require('../../controllers/controllersDocumentos/GetControllersDocumentos');

const getHandlerDocumentos = async (req, res) => {
  try {
    const {nombre, descripcion, fechaInicio, fechaFin, idProyecto} = req.query;
    const documentos = await getControllersDocumentos(
      nombre,
      descripcion,
      fechaInicio,
      fechaFin,
      idProyecto
    );
    return res.status(200).json(documentos);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {getHandlerDocumentos};
