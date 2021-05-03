const sendEmail = require("../utils/sendMail")

const sendAppointmentApprovalEmail = (email, name) => {
  const msg = {
    from: {
      email: 'mahmoudAmer95.bird@gmail.com',
      name: 'Beauty Salons'
    },
    to: `${email}`,
    subject: 'Appointment Approved',
    text: `Your appointment is pending approval approved. wishing you a neat hair cut.`
  }
  sendEmail(msg);
}

const sendAppointmentReservationEmail = (email, name) => {
  const msg = {
    from: {
      email: 'mahmoudAmer95.bird@gmail.com',
      name: 'Beauty Salons'
    },
    to: `${email}`,
    subject: 'Appointment Approved',
    text: `Your appointment is pending approval approved. wishing you a neat hair cut.`
  }
  sendEmail(msg);
}

const sendAppointmentUpdateEmail = (email, name) => {
  const msg = {
    from: {
      email: 'mahmoudAmer95.bird@gmail.com',
      name: 'Beauty Salons'
    },
    to: `${email}`,
    subject: 'Appointment Approved',
    text: `Your appointment is updated. wishing you a neat hair cut.`
  }
  sendEmail(msg);
}

const sendAppointmentCancellationEmail = (email, name) => {
  const msg = {
    from: {
      email: 'mahmoudAmer95.bird@gmail.com',
      name: 'Beauty Salons'
    },
    to: `${email}`,
    subject: 'Appointment Approved',
    text: `Your appointment is cancelled. If there was any issues please contact us.`
  }
  sendEmail(msg);
}

const sendBadReviewEmail = (email, name, stars) => {
  const msg = {
    from: {
      email: 'mahmoudAmer95.bird@gmail.com',
      name: 'Beauty Salons'
    },
    to: `${email}`,
    subject: 'Is there any problem?',
    text: `${name} rating was ${stars}. 
    One of our personell will contact you to check if there was any problem and try to solve it.\n
    we are very sorry`
  }
  sendEmail(msg);
}

module.exports = {
  sendAppointmentApprovalEmail,
  sendAppointmentReservationEmail,
  sendAppointmentUpdateEmail,
  sendAppointmentCancellationEmail,
  sendBadReviewEmail,
}