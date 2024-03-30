const mongoose = require('mongoose');
const connection = require('../config/DB');

const evidenciasSchema = new mongoose.Schema(
  {
    foto: String,
    idProyecto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proyectos',
    },
    idTarea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tareas',
    },
  },
  {
    timestamps: true,
  }
);

const EvidenciasModel = connection.model('Evidencias', evidenciasSchema);
module.exports = EvidenciasModel;
