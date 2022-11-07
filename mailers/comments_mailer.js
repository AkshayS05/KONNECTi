const nodeMailer = require('../config/nodemailer');

// this is another way of exporting a method
exports.newComment = (comment) => {
  let htmlString = nodeMailer.renderTemplate(
    { comment: comment },
    '/comments/new_comment.ejs',
  );
  nodeMailer.transporter.sendMail(
    {
      from: 'myemail@gmail.com',
      to: comment.user.email,
      subject: 'New comment published!',
      html: htmlString,
    },
    //   info carries the information about the request that has been sent
    (err, info) => {
      if (err) {
        console.log('Error in sending mail', err);
        return;
      }
      console.log('Message sent', info);
      return;
    },
  );
};
//  we need to trigger this whenever there is a new comment which is handled by comment controller
