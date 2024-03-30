const {
  postHandlerEmail,
} = require('../../handlers/handlersEmail/PostHandlerEmail');

const router = require('express').Router();

router.post('/', postHandlerEmail);

module.exports = router;
