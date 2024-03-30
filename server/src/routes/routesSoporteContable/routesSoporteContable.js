
const { postHandlerSoporteContable } = require('../../handlers/handlersSoporteContable/PostHandlerSoporteContable');
const { deleteHandlerSoporteContable } = require('../../handlers/handlersSoporteContable/DeleteHandlerSoporteContable');
const { putHandlerSoporteContable } = require('../../handlers/handlersSoporteContable/PutHandlerSoporteContable')
const { getHandlerSoporteContable } = require('../../handlers/handlersSoporteContable/GetHandlerSoporteContable')

const router = require('express').Router();

router.post('/', postHandlerSoporteContable);
router.delete('/:id', deleteHandlerSoporteContable);
router.put('/:id', putHandlerSoporteContable)
router.get('/', getHandlerSoporteContable)

module.exports = router; 