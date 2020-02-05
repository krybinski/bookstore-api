const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');

const booksRouter = require('./modules/books/BooksRouter');

const PORT = 3001;
const app = express();

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

booksRouter(app);

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  if (err.status === 500) {
    console.log('Server error', err);
  }
  res.status(err.status).json({
    message: err.message || 'Unable to perform request',
    status: err.status,
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
