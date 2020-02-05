const books = require('../../data/books');

const BooksService = {
  getAll: () => {
    return books;
  },
  getById: id => {
    return books.filter(book => book.id == id)[0];
  },
};

module.exports = BooksService;
