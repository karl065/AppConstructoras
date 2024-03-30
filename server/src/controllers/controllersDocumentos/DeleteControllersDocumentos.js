const Documentos = require('../../models/Documentos');
const Proyectos = require('../../models/Proyectos');

const deleteControllersDocumentos = async (id) => {
  try {
    // Eliminamos el registro de la colección Documentos
    const eliminarDocumento = await Documentos.findByIdAndDelete(id);

    if (eliminarDocumento.idProyecto) {
      const proyecto = await Proyectos.findById(eliminarDocumento.idProyecto);
      proyecto.documentos.pull(id);
      await proyecto.save();
    }

    return eliminarDocumento;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {deleteControllersDocumentos};
