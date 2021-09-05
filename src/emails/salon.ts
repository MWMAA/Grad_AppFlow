import { Mailbody } from "../interfaces/user";
import sendEmail from "../utils/sendMail";

export const sendSalonCreationEmail = (email: string, name: string) => {
  const msg = {
    from: {
      email: "mahmoudAmer95.bird@gmail.com",
      name: "Beauty Salons",
    },
    to: `${email}`,
    subject: "Salon Created",
    text: `Salon ${name} is Created. Happy styling XD.`,
  } as Mailbody;
  sendEmail(msg);
};

export const sendSalonDeletionEmail = (email: string, name: string) => {
  const msg = {
    from: {
      email: "mahmoudAmer95.bird@gmail.com",
      name: "Beauty Salons",
    },
    to: `${email}`,
    subject: "Salon Deleted",
    text: `Salon ${name} is deleted, we hope you make another one soon.`,
  } as Mailbody;
  sendEmail(msg);
};
