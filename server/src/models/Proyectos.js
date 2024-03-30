const mongoose = require('mongoose');
const connection = require('../config/DB');

const proyectosSchema = new mongoose.Schema({
  nombreProyecto: String,
  departamento: String,
  ciudad: String,
  descripcion: String,
  fechaInicio: Date,
  fechaFin: Date,
  finalizado: {
    type: Boolean,
    default: false,
  },
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuarios',
  },
  documentos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Documentos',
    },
  ],
  tareas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tareas',
    },
  ],
  observaciones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Observaciones',
    },
  ],
  soporteContable: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SoporteContable',
    },
  ],
});

const ProyectosModel = connection.model('Proyectos', proyectosSchema);
module.exports = ProyectosModel;
