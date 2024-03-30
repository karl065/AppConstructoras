const {
  postHandlerDocumentos,
} = require('../../handlers/handlersDocumentos/PostHandlerDocumentos');
const {
  deleteHandlerDocumentos,
} = require('../../handlers/handlersDocumentos/DeleteHandlerDocumentos');
const {
  getHandlerDocumentos,
} = require('../../handlers/handlersDocumentos/GetHandlerDocumentos');
const {
  putHandlerDocumento,
} = require('../../handlers/handlersDocumentos/PutDocumentosHandler');

const router = require('express').Router();

router.post('/', postHandlerDocumentos);
router.delete('/:id', deleteHandlerDocumentos);
router.put('/:id', putHandlerDocumento);
router.get('/', getHandlerDocumentos);

module.exports = router;
