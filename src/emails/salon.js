const sendEmail = require("../utils/sendMail")

const sendSalonCreationEmail = (email, name) => {
  const msg = {
    from: {
      email: 'mahmoudAmer95.bird@gmail.com',
      name: 'Beauty Salons'
    },
    to: `${email}`,
    subject: 'Salon Created',
    text: `Salon ${name} is Created. Happy styling XD.`
  }
  sendEmail(msg);
}

const sendSalonDeletionEmail = (email, name) => {
  const msg = {
    from: {
      email: 'mahmoudAmer95.bird@gmail.com',
      name: 'Beauty Salons'
    },
    to: `${email}`,
    subject: 'Salon Deleted',
    text: `Salon ${name} is deleted, we hope you make another one soon.`
  }
  sendEmail(msg);
}


module.exports = {
  sendSalonCreationEmail,
  sendSalonDeletionEmail
}