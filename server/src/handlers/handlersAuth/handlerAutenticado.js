const {usuarioAutenticado} = require('../../auth/usuarioAutenticado');

const handlerAutenticado = async (req, res) => {
  try {
    const usuarioToken = req.usuario;
    const usuario = await usuarioAutenticado(usuarioToken);
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(401).json({error: error.message});
  }
};

module.exports = {handlerAutenticado};
