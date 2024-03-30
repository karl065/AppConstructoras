const {autenticarUsuario} = require('../../auth/autenticarUsuario');

const handlerAutenticar = async (req, res) => {
  try {
    const {email, password} = req.body;
    const token = await autenticarUsuario(email, password);
    return res.status(200).json(token);
  } catch (error) {
    return res.status(401).json(error);
  }
};

module.exports = {handlerAutenticar};
