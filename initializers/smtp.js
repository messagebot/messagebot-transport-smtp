var nodemailer    = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

module.exports = {
  loadPriority:  1000,

  initialize: function(api, next){
    var transport = {
      name: 'smtp',
      description: 'for sending E-Mail via SMTP',

      requiredDataKeys: {
        person: ['email']
      },

      deliver: function(payload, person, callback){
        var email = {
          to:      person.data.email,
          from:    payload.from,
          subject: payload.subject,
          html:    payload.body,
        };

        api.smtp.client.sendMail(email, callback);
      },

      client: nodemailer.createTransport(smtpTransport(api.config.smtp))
    }

    api.trasnports.push(transport);

    next();
  },
};
