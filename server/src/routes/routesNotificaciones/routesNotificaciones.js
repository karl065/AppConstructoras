const {
  getHandlerNotificaciones,
} = require('../../handlers/handlersNotificaciones/GetHandlersNotificaciones');
const {
  PostHandlersNotificaciones,
} = require('../../handlers/handlersNotificaciones/PostHandlersNotificaciones');

const router = require('express').Router();

router.post('/', PostHandlersNotificaciones);
// router.put('/:id', PutHandlerMensajes);
router.get('/', getHandlerNotificaciones);

module.exports = router;
