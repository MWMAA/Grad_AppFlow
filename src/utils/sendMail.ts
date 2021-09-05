import sgMail from "@sendgrid/mail";
import { Mailbody } from "../interfaces/user";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const sendEmail = (msg: Mailbody) => {
  if (process.env.NODE_ENV === "TEST") {
    msg.mail_settings = {
      sandbox_mode: {
        enable: true,
      },
    };
  }

  sgMail.send(msg).catch((error) => {
    console.error(error);
  });
};

export default sendEmail;
