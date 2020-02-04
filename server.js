const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const BooksService = require("./services/BookService");

const app = express();

app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/v1/books", (req, res, next) => {
  const books = BooksService.getAll();

  res.send(books);
});

app.get("/api/v1/books/:id", (req, res, next) => {
  const { id } = req.params;
  const book = BooksService.getById(id);

  res.send(...book);
});

app.get("/api/v1/books/:id/cover", (req, res, next) => {
  const { id } = req.params;
  const book = BooksService.getById(id);
  const { filepath } = book;

  fs.readFile(filepath, (err, data) => {
    if (err) throw err;

    res.end(data);
  });
});

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  if (err.status === 500) {
    console.log("Error", err);
  }
  res.status(err.status).json({
    message: err.message || "Unable to perform request",
    status: err.status
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
