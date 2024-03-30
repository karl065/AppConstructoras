const mongoose = require('mongoose');
const connection = require('../config/DB');

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  email: {type: String, unique: true},
  password: {
    type: String,
    required: true,
  },
  telefono: String,
  foto: String,
  rol: {
    type: String,
    enum: ['SuperAdmin', 'Admin', 'Usuario'],
    require: true,
  },
  habilitado: {
    type: Boolean,
    default: true,
    required: true,
  },
  estado: {
    type: Boolean,
    default: false,
    required: true,
  },
  proyectos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proyectos',
    },
  ],
  tareas: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tareas',
    },
  ],
  notificaciones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Notificaciones',
    },
  ],
  mensajesEnviados: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mensajes',
    },
  ],
  mensajesRecibidos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mensajes',
    },
  ],
});

const UsuarioModel = connection.model('Usuarios', usuarioSchema);
module.exports = UsuarioModel;
