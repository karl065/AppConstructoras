const {
  deleteHandlerTareas,
} = require('../../handlers/handlersTareas/DeleteHandlerTareas');
const {
  getHandlerTareas,
} = require('../../handlers/handlersTareas/GetHandlerTareas');
const {
  postHandlerTareas,
} = require('../../handlers/handlersTareas/PostHandlerTareas');
const {
  putHandlerTareas,
} = require('../../handlers/handlersTareas/PutHandlerTareas');

const router = require('express').Router();

router.post('/', postHandlerTareas);
router.get('/', getHandlerTareas);
router.put('/:id', putHandlerTareas);
router.delete('/:id', deleteHandlerTareas);

module.exports = router;
