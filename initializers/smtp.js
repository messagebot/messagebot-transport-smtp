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

      campaignVariables: [
        'from',
        'subject'
      ],

      deliver: function(payload, person, callback){
        var email = {
          to:      person.data.data.email,
          from:    payload.from,
          subject: payload.subject,
          html:    payload.body,
        };

        transport.client.sendMail(email, callback);
      },

      client: nodemailer.createTransport(smtpTransport(api.config.smtp))
    }

    api.transports.push(transport);

    next();
  },
};
