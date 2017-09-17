import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as BooksAPI from './BooksAPI';
import BookShelf from './BookShelf';

class ListBooks extends Component {
  CURRENTLY_READING = "currentlyReading";
  READ = "read";
  WANT_TO_READ = "wantToRead";

  state = {
    books: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState((state) => {
        state.books.currentlyReading = books.filter(book => book.shelf === this.CURRENTLY_READING);
        state.books.wantToRead = books.filter(book => book.shelf === this.WANT_TO_READ);
        state.books.read = books.filter(book => book.shelf === this.READ);
      });
    })
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf title="Currently reading" books={this.state.books.currentlyReading} />
            <BookShelf title="Want to read" books={this.state.books.wantToRead} />
            <BookShelf title="Read" books={this.state.books.read} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default ListBooks