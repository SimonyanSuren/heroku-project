const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports.sendEmail = function (html, subject, to, from) {
  return new Promise((resolve, reject) => {
    sgMail
      .send({
        to,
        from,
        subject,
        html,
      })
      .then(resolve)
      .catch(reject);
  });
};
