const express=require('express');
const app = express();

const port = 8000;
//use express.router in the main index.js file
app.use('/', require('./routes'));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error while running the server, ${err}`);
  }
  console.log(`App is running on port ${port}`);
});
