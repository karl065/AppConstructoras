const {
  deleteHandlerUsuarios,
} = require('../../handlers/handlersUsuarios/DeleteHandlerUsuarios');
const {
  getHandlerUsuarios,
} = require('../../handlers/handlersUsuarios/GetHandlerUsuarios');
const {
  postHandlerUsuarios,
} = require('../../handlers/handlersUsuarios/PostHandlerUsuarios');
const {
  putHandlerUsuarios,
} = require('../../handlers/handlersUsuarios/PutHandlerUsuarios');

const router = require('express').Router();

router.post('/', postHandlerUsuarios);
router.get('/', getHandlerUsuarios);
router.put('/:id', putHandlerUsuarios);
router.delete('/:id', deleteHandlerUsuarios);

module.exports = router;
