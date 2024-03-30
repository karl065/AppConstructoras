const nodemailer = require('nodemailer');
const {EMAIL_PORT, EMAIL, EMAIL_PASS} = process.env;

const transporter = async () => {
  const respuesta = await nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: EMAIL_PORT,
    secure: false,
    auth: {
      user: EMAIL,
      pass: EMAIL_PASS,
    },
  });
  return respuesta;
};

module.exports = {transporter};
