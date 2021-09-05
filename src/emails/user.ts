import { Mailbody } from "../interfaces/user";
import sendEmail from "../utils/sendMail";

export const sendWelcomeEmail = (
  email: string,
  name: string,
  emailToken: string,
  host: string
): void => {
  const msg = {
    from: {
      email: "mahmoudAmer95.bird@gmail.com",
      name: "Museum",
    },
    to: `${email}`,
    subject: "Welcome to the museum",
    text: `Welcome to the museum, ${name}. let us know how you get along with the app.\nTo activate the account please click the following link: http://${host}/emailVerification?token=${emailToken}`,
  } as Mailbody;
  sendEmail(msg);
};

export const passwordChangeEmail = (email: string, token: string): void => {
  const msg = {
    from: {
      email: "mahmoudAmer95.bird@gmail.com",
      name: "Beauty Salons",
    },
    to: `${email}`,
    subject: "Password Change Request!",
    text: `This email just requested a password change.\nClick on this link to change password : ${token} \nIf not you please ignore this Email.`,
  } as Mailbody;
  sendEmail(msg);
};

export const passwordChangedEmail = (
  email: string,
  name: string = ""
): void => {
  const msg = {
    from: {
      email: "mahmoudAmer95.bird@gmail.com",
      name: "Beauty Salons",
    },
    to: `${email}`,
    subject: "Password Change Request!",
    text: `Password changed successfully, if not you reply to this mail and our customer service will come back to you.`,
  } as Mailbody;
  sendEmail(msg);
};

export const sendByeByeEmail = (email: string, name: string) => {
  const msg = {
    from: {
      email: "mahmoudAmer95.bird@gmail.com",
      name: "Beauty Salons",
    },
    to: `${email}`,
    subject: "We will miss you",
    text: `Sad to see you go, ${name}. ;(`,
  } as Mailbody;
  sendEmail(msg);
};
