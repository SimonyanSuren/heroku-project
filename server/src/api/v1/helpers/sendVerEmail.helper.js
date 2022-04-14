const { sendEmail } = require('./sendEmail.helper');

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/api/v1/auth/verify-email?vToken=${verificationToken}&email=${email}`;

  const message = `<p>Please confirm your email by clicking on the following link : 
  <a href="${verifyEmail}">Verify Email</a> </p>`;

  const msg = {
    to: email,
    from: 'suren.simonyan@inomma.com',
    subject: 'Email Confirmation',
    html: `<h4> Hello, ${name}</h4>
	${message}
	`,
  };

  sendEmail(msg.html, msg.subject, msg.to, msg.from)
    .then((res) => console.log('Email send'))

};

module.exports = sendVerificationEmail;
