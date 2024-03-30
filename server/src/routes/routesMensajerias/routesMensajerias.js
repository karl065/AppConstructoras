const {
  getHandlerMensajes,
} = require('../../handlers/handlerMensajerias/GetHandlerMensajerias');
const {
  postHandlerMensajes,
} = require('../../handlers/handlerMensajerias/PostHandlerMensajerias');
const {
  PutHandlerMensajes,
} = require('../../handlers/handlerMensajerias/PutHandlerMensajerias');

const router = require('express').Router();

router.post('/', postHandlerMensajes);
router.put('/:id', PutHandlerMensajes);
router.get('/', getHandlerMensajes);

module.exports = router;
