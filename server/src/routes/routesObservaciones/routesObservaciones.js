const {
  DeleteHandlerObservaciones,
} = require('../../handlers/handlersObservaciones/DeleteHandlerObservaciones');
const {
  getHandlerObservaciones,
} = require('../../handlers/handlersObservaciones/GetHandlerObservaciones');
const {
  postHandlerObservaciones,
} = require('../../handlers/handlersObservaciones/PostHandlerObservaciones');
const {
  PutHandlerObservaciones,
} = require('../../handlers/handlersObservaciones/PutHandlerObservaciones');

const router = require('express').Router();

router.post('/', postHandlerObservaciones);
router.delete('/:id', DeleteHandlerObservaciones);
router.put('/:id', PutHandlerObservaciones);
router.get('/', getHandlerObservaciones);

module.exports = router;
