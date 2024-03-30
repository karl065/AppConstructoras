const mongoose = require('mongoose');
const connection = require('../config/DB');

const notificacionesSchema = new mongoose.Schema({
  mensajes: {
    type: String,
    required: true,
  },
  usuarios: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',
      required: true,
    },
  ],
  leidoPor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuarios',
    },
  ],
  timestamp: {type: Date, default: Date.now},
});

const NotificacionesModel = connection.model(
  'Notificaciones',
  notificacionesSchema
);

module.exports = NotificacionesModel;
