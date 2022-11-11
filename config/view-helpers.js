const env = require('./environment');
const fs = require('fs');
const path = require('path');
// app will receieve express app instance, thus we will call it from index
module.exports = function (app) {
  app.locals.assetPath = function (filePath) {
    console.log(filePath);
    if (eval(JSON.stringify(process.env.NODE_ENV)) == 'development') {
      return '/' + filePath;
    }
    return (
      '/' +
      JSON.parse(
        fs.readFileSync(
          path.join(__dirname, '../public/assets/rev-manifest.json'),
        ),
      )[filePath]
    );
  };
};
