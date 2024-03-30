const {transporter} = require('../../helpers/Mailers/mailers');

const postHandlerEmail = async (req, res) => {
  try {
    const {email} = req.body;
    const result = await transporter.sendMail({
      from: `GrupoJM ${process.env.EMAIL}`,
      to: email,
      subject: 'Prueba de correo',
      body: 'Hola, este es un correo de prueba',
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {postHandlerEmail};
