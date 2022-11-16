import dotenv from "dotenv";
dotenv.config();
import { createTransport } from "nodemailer";
const FROM_EMAIL_GOOGLE = process.env.FROM_EMAIL_GOOGLE;
const PASS_EMAIL_GOOGLE = process.env.PASS_EMAIL_GOOGLE;

const sendEmailGoogle = async (email, message, detalle) => {
  const transporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: FROM_EMAIL_GOOGLE,
      pass: PASS_EMAIL_GOOGLE,
    },
  });
  const mailOptions = {
    from: "Servidor Node.js",
    to: FROM_EMAIL_GOOGLE,
    subject: message,
    html: `<h3>${detalle}</h3>`,
    text: "Mensaje de bienvenida, mensaje enviado a través de Nodemailer",
    attachments: [
      {
        filename: "Detalle_venta.txt",
        content: message + " " + detalle,
        contentType: "text/plain",
      },
    ],
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(info);
  } catch (error) {
    console.log(error);
  }
};
export default sendEmailGoogle;