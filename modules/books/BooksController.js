const fs = require('fs');
const BooksService = require('./BooksService');

const BooksController = {
  getAll: (req, res, next) => {
    const books = BooksService.getAll();

    res.send(books);
  },
  getById: (req, res, next) => {
    const { id } = req.params;
    const book = BooksService.getById(id);

    res.send(book);
  },
  getCover: (req, res, next) => {
    const { id } = req.params;
    const book = BooksService.getById(id);
    const { filepath } = book;

    fs.readFile(filepath, (err, data) => {
      if (err) throw err;

      res.end(data);
    });
  },
};

module.exports = BooksController;
