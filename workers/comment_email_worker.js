const queue = require('../config/kue');
const commentsMailer = require('../mailers/comments_mailer');

queue.process('emails', function (job, done) {
  // here job.data is the data sent in the comment
  console.log('email worker is processing a job', job.data);
  commentsMailer.newComment(job.data);
  done();
});
