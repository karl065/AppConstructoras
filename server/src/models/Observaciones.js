const mongoose = require('mongoose');
const connection = require('../config/DB');

const observacionesSchema = new mongoose.Schema(
  {
    observacion: String,
    idProyectos: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proyectos',
    },
    idTareas: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tareas',
    },
  },
  {
    timestamps: true,
  }
);

const ObservacionesModel = connection.model(
  'Observaciones',
  observacionesSchema
);
module.exports = ObservacionesModel;
