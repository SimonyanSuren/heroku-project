const { sendEmail } = require('./sendEmail.helper');

const sendResetPassswordEmail = async ({ name, email, token, origin }) => {
  const resetURL = `${origin}/newpass?token=${token}&email=${email}`;
  const message = `<p>Please reset password by clicking on the following link : 
  <a href="${resetURL}">Reset Password</a></p>`;

  const msg = {
    to: email,
    from: 'suren.simonyan@inomma.com',
    subject: 'Reset Password',
    html: `<h4> Hello, ${name}</h4>
  ${message}
  `,
  };

  return sendEmail(msg.html, msg.subject, msg.to, msg.from)
    .then((res) => console.log('Email send'))
   
};
  
module.exports = sendResetPassswordEmail;
