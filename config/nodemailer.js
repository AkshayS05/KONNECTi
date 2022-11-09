const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const env = require('./environment');
// this is the path that defines how the communication will take place
let transporter = nodemailer.createTransport(env.smpt);

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
