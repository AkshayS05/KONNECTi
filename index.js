import express from 'express';

const app = express();

const port = 8000;

app.listen(port, function (err) {
  if (err) {
    console.log(`Error while running the server, ${err}`);
  }
  console.log(`App is running on port ${port}`);
});
