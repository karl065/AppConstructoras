const mongoose = require('mongoose');
const connection = require('../config/DB');

const soporteContableSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  fecha: Date,
  archivo: String,
  valor: Number,
  idProyectos: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proyectos',
  },
});

const SoporteContableModel = connection.model(
  'SoporteContable',
  soporteContableSchema
);
module.exports = SoporteContableModel;
