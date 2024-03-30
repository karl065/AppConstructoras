const {
  handlerAutenticado,
} = require('../../handlers/handlersAuth/handlerAutenticado');
const {
  handlerAutenticar,
} = require('../../handlers/handlersAuth/handlerAutenticar');
const {authMiddle} = require('../../middlewares/auth/authMiddle');

const router = require('express').Router();

router.post('/', handlerAutenticar);
router.get('/', authMiddle, handlerAutenticado);

module.exports = router;
