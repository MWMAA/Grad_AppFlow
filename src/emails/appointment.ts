import { Mailbody } from "../interfaces/user";
import sendEmail from "../utils/sendMail";

export const sendAppointmentApprovalEmail = (email: string): void => {
  const msg = {
    from: {
      email: "mahmoudAmer95.bird@gmail.com",
      name: "Beauty Salons",
    },
    to: `${email}`,
    subject: "Appointment Approved",
    text: `Your appointment is pending approval approved. wishing you a neat hair cut.`,
  } as Mailbody;
  sendEmail(msg);
};

export const sendAppointmentReservationEmail = (email: string): void => {
  const msg = {
    from: {
      email: "mahmoudAmer95.bird@gmail.com",
      name: "Beauty Salons",
    },
    to: `${email}`,
    subject: "Appointment Approved",
    text: `Your appointment is pending approval approved. wishing you a neat hair cut.`,
  } as Mailbody;
  sendEmail(msg);
};

export const sendAppointmentUpdateEmail = (email: string): void => {
  const msg = {
    from: {
      email: "mahmoudAmer95.bird@gmail.com",
      name: "Beauty Salons",
    },
    to: `${email}`,
    subject: "Appointment Approved",
    text: `Your appointment is updated. wishing you a neat hair cut.`,
  } as Mailbody;
  sendEmail(msg);
};

export const sendAppointmentCancellationEmail = (email: string): void => {
  const msg = {
    from: {
      email: "mahmoudAmer95.bird@gmail.com",
      name: "Beauty Salons",
    },
    to: `${email}`,
    subject: "Appointment Approved",
    text: `Your appointment is cancelled. If there was any issues please contact us.`,
  } as Mailbody;
  sendEmail(msg);
};

export const sendBadReviewEmail = (
  email: string,
  name: string,
  stars: number
): void => {
  const msg = {
    from: {
      email: "mahmoudAmer95.bird@gmail.com",
      name: "Beauty Salons",
    },
    to: `${email}`,
    subject: "Is there any problem?",
    text: `${name} rating was ${stars}. 
    One of our personell will contact you to check if there was any problem and try to solve it.\n
    we are very sorry`,
  } as Mailbody;
  sendEmail(msg);
};
