const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// this is the path that defines how the communication will take place
let transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'myname',
    pass: 'mysecretpass',
  },
});

let renderTemplate = (data, relativePath) => {
  let mailHTML;
  //   here relative path specifies a place from where this function is called
  ejs.renderFile(
    path.join(__dirname, '../views/mailers', relativePath),
    data,
    function (err, template) {
      if (err) {
        console.log('Error in rendering template');
        return;
      }
      mailHTML = template;
    },
  );
  return mailHTML;
};
module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
