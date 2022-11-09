let development = {
  name: 'development',
  asset_path: '/assets',
  session_cookie_key: 'somethingdogs',
  db: 'konnectI_development',
  smpt: {
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'akshay sharma',
      pass: 'mysecretpass',
    },
  },
  google_client_id:
    '395415921785-3u2vp52ee8jl9u2j9r4utbgfujscg5q8.apps.googleusercontent.com',
  google_client_secret: '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',
  google_callback_url: 'http://localhost:8000/users/auth/google/callback',
  jwt_secret_key: 'thekonnectisocialApp',
};
let production = {
  name: 'production',
};

module.exports = development;
