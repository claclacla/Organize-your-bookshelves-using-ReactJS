import * as BooksAPI from './BooksAPI';

class BookRESTRepository {
  get() {
    return new Promise((resolve, reject) => {
      BooksAPI.getAll().then((books) => {
        resolve(books);
      })
    });
  }

  getById(id) {
    return new Promise((resolve, reject) => {
      BooksAPI.get(id).then((book) => {
        resolve(book);
      });
    });
  }

  update(book) {
    return new Promise((resolve, reject) => {
      BooksAPI.update(book, book.shelf).then((res) => {
        resolve();
      });
    });
  }
}

export default BookRESTRepository