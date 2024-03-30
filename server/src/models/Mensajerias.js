const mongoose = require('mongoose');
const connection = require('../config/DB');

const mensajesSchema = new mongoose.Schema({
  mensajes: {
    type: String,
    required: true,
  },
  idRemitente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuarios',
    required: true,
  }, // Referencia al remitente
  idDestinatario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuarios',
    required: true,
  }, // Referencia al destinatario
  timestamp: {type: Date, default: Date.now},
});

const MensajesModel = connection.model('Mensajes', mensajesSchema);

module.exports = MensajesModel;
