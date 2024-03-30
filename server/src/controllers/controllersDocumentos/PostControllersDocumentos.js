const Documentos = require('../../models/Documentos');
const Proyectos = require('../../models/Proyectos');

//Crearemos el controlador para crear un documentos

const postControllersDocumentos = async (documento) => {
  try {
    const nuevoDocumento = await Documentos.create(documento);

    if (documento.idProyecto) {
      await Proyectos.findByIdAndUpdate(
        documento.idProyecto,
        {$push: {documentos: nuevoDocumento._id}},
        {new: true}
      );
    }
    return nuevoDocumento;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {postControllersDocumentos};
