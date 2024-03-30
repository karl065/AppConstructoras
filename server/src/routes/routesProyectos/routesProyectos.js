const { postHandlerProyectos } = require('../../handlers/handlersProyectos/PostHandlerProyectos');
const { deleteHandlerProyectos } = require('../../handlers/handlersProyectos/DeleteHandlerProyectos');
const { putHandlerProyecto } = require('../../handlers/handlersProyectos/PutHandlerProyectos')
const { getHandlerProyectos } = require('../../handlers/handlersProyectos/GetHandlerProyectos');

const router = require('express').Router();

router.post('/', postHandlerProyectos);
router.delete('/:id', deleteHandlerProyectos);
router.put('/:id', putHandlerProyecto)
router.get('/', getHandlerProyectos);

module.exports = router

