const mongoose = require('mongoose');
const connection = require('../config/DB');

const tareasSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  fechaInicio: Date,
  fechaVencimiento: Date,
  estado: {
    type: Number,
    default: 0,
    require: true,
  },
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuarios',
  },
  idProyectos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proyectos',
  },
  observaciones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Observaciones',
    },
  ],
  evidencias: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Evidencias',
    },
  ],
});

const TareasModel = connection.model('Tareas', tareasSchema);
module.exports = TareasModel;
