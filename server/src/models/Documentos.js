const mongoose = require('mongoose');
const connection = require('../config/DB');

const documentosSchema = new mongoose.Schema(
  {
    nombre: String,
    descripcion: String,
    archivo: String,
    idProyecto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proyectos',
    },
  },
  {
    timestamps: true,
  }
);

const DocumentosModel = connection.model('Documentos', documentosSchema);
module.exports = DocumentosModel;
