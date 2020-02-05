const BooksController = require('./BooksController');

const BooksRouter = app => {
  app.get('/api/v1/books', BooksController.getAll);
  app.get('/api/v1/books/:id', BooksController.getById);
  app.get('/api/v1/books/:id/cover', BooksController.getCover);
};

module.exports = BooksRouter;
