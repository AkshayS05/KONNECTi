// to use morgan
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// creating a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d', //->rotate daily
  path: logDirectory,
});
let development = {
  name: 'development',
  asset_path: './public/assets',
  session_cookie_key: 'somethingdogs',
  db: 'konnectI_development',
  smpt: {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'sample@gmail.com',
      pass: 'mysecretpass',
    },
  },
  google_client_id:
    '395415921785-3u2vp52ee8jl9u2j9r4utbgfujscg5q8.apps.googleusercontent.com',
  google_client_secret: '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',
  google_callback_url: 'http://localhost:8000/users/auth/google/callback',
  jwt_secret_key: 'thekonnectisocialApp',
  morgan: {
    mode: 'dev',
    options: { stream: accessLogStream },
  },
};
let production = {
  name: 'production',
  asset_path: './assets',
  session_cookie_key: process.env.SESSION_COOKIE_KEY,
  db: process.env.Konnecti_DB,
  smpt: {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  },
  google_client_id: process.env.Google_Client_Id,
  google_client_secret: process.env.Google_Client_Secret,
  google_callback_url: process.env.Google_Callback_Url,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  morgan: {
    mode: 'combined',
    options: { stream: accessLogStream },
  },
};
if (process.env.KONNECTi_Environment == undefined) {
}
module.exports = development;
// module.exports =
//   eval(process.env.KONNECTi_Environment) == undefined
//     ? development
//     : eval(process.env.KONNECTi_Environment);
