const sendEmail = require('../utils/sendMail')

const sendWelcomeEmail = (email, name) => {
  const msg = {
    from: {
      email: 'mahmoudAmer95.bird@gmail.com',
      name: 'Beauty Salons'
    },
    to: `${email}`,
    subject: 'Welcome to the family',
    text: `Welcome to the app, ${name}. let me know how you get along with the app.\n To activate the account please click the following link: LINK`
  }
  sendEmail(msg);
}

const passwordChangeEmail = (email, token) => {
  const msg = {
    from: {
      email: 'mahmoudAmer95.bird@gmail.com',
      name: 'Beauty Salons'
    },
    to: `${email}`,
    subject: 'Password Change Request!',
    text: `This email just requested a password change.\nClick on this link to change password : ${token} \nIf not you please ignore this Email.`
  }
  sendEmail(msg);
}

const passwordChangedEmail = (email, name) => {
  const msg = {
    from: {
      email: 'mahmoudAmer95.bird@gmail.com',
      name: 'Beauty Salons'
    },
    to: `${email}`,
    subject: 'Password Change Request!',
    text: `Password changed successfully, if not you reply to this mail and our customer service will come back to you.`
  }
  sendEmail(msg);
}

const sendByeByeEmail = (email, name) => {
  const msg = {
    from: {
      email: 'mahmoudAmer95.bird@gmail.com',
      name: 'Beauty Salons'
    },
    to: `${email}`,
    subject: 'We will miss you',
    text: `Sad to see you go, ${name}. ;(`
  }
  sendEmail(msg);
}

module.exports = {
  sendWelcomeEmail,
  passwordChangeEmail,
  passwordChangedEmail,
  sendByeByeEmail
}