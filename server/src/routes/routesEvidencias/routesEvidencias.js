const {
    DeleteHandlerEvidencias,
} = require('../../handlers/handlersEvidencias/DeleteHandlerEvidencias');
const {
    getHandlerEvidencias,
} = require('../../handlers/handlersEvidencias/GetHandlerEvidencias');
const {
    postHandlerEvidencias,
} = require('../../handlers/handlersEvidencias/PostHandlerEvidencias');
const {
    putHandlerEvidencias,
} = require('../../handlers/handlersEvidencias/PutHandlerEvidencias');

const router = require('express').Router();

router.post('/', postHandlerEvidencias);
router.delete('/:id', DeleteHandlerEvidencias);
router.put('/:id', putHandlerEvidencias);
router.get('/', getHandlerEvidencias);

module.exports = router;