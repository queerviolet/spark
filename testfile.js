const sendmail = require('sendmail')();

const sendInvite = (email) => {
  sendmail({
    from: 'joinatrip@triphub.notasite',
    to: email,
    subject: 'test sendmail',
    html: 'Mail of test sendmail ',
  }, function (err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
  });
};

export default sendInvite;
