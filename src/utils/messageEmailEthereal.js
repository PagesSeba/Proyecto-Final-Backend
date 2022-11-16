import dotenv from "dotenv";
dotenv.config();
import { createTransport } from "nodemailer";
const TEST_MAIL_ETHEREAL = process.env.TEST_MAIL_ETHEREAL;
const PASS_MAIL_ETHEREAL = process.env.PASS_MAIL_ETHEREAL;

const sendEmail = async (email, message, detalle) => {
  const transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: TEST_MAIL_ETHEREAL,
      pass: PASS_MAIL_ETHEREAL,
    },
  });
  const mailOptions = {
    from: "Servidor Node.js",
    to: TEST_MAIL_ETHEREAL,
    subject: message,
    html: `<h3>${detalle}</h3>`,
    text: "Mensaje de bienvenida, mensaje enviado a través de Nodemailer",
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (error) {
    console.log(error);
  }
};
export default sendEmail;